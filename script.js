/* I'm sorry... I never recovered from rust...*/
/* This design *might* be useful for my project... */
/* Concept: "stateful tags"??? */

const RE_SPEC_CHARS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

// query less, eye-bleed more :)
const sections = {
  alert: {
    el_name: null,
    init: function(el) {
      this.el_name = el.querySelector("#alert-name");

      // OMG monad hi!!! #^_^#
      let name = () => this.el_name.value;

      el.onsubmit = function(ev) {
        ev.preventDefault();

        // ES6 template strings practice!
        alert(`Hi ${name()}`);
      }
    }
  },
  color: {
    state: 0,
    // defined in style.css
    colors: ["color1", "color2"],
    init: function(el) {
      // required for onclick to work properly
      if (document.body.classList.length == 0) {
        document.body.classList.add(this.colors[0]);
      }

      // hi monad -_-
      let toggle_bg = () => 
        document.body.classList
          .replace( // NOTE: expects body has .color1
            this.colors[(this.state++)%2],
            this.colors[(this.state)%2]
          );
      
      el.querySelector("#color-btn").onclick = toggle_bg;
    },
  },
  regex: {
    el_input: null,
    init: function(el) {
      this.el_input = el.querySelector("#regex-btn");

      let input = this.el_input.value;

      el.onsubmit = function(ev) {
        ev.preventDefault();

        if (input.match(RE_SPEC_CHARS) != null) {
          alert("No special characters");
        }
      }
    },
  },
  cat: {
    init: function(el) {
      el.querySelector("#cat-btn").onclick = function() {
        $("h1")[0].textContent += " Add Text";
      }      
    },
  },
};


function init() {
  // one query per element!!!
  // extensible!!!
  // add <section id> <=> add section[id]
  $("main section")
    .forEach(section => {
      sections[section.id.split('-')[0]].init(section);
    });
}

// aux function: not running IDE, not typing all that out chief :)
function $() {
  return document.querySelectorAll.apply(document, arguments);
}


window.onload = init;
