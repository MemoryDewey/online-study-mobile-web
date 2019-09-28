import Vue from 'vue'
import './hammer'

function vueTouch(el, type, binding) {
    this.el = el;
    this.type = type;
    this.binding = binding;
    //直接调用
    const hammertime = new Hammer(this.el);
    hammertime.on(this.type, this.binding.value);
}

const doubletap = Vue.directive("doubletap", {
    bind: function (el, binding) {
        new vueTouch(el, "doubletap", binding);
    }
});

export {doubletap}

