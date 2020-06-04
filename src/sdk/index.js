import {VueUI, VueUIList, Throttle} from '@mikefeng110808/vue-instance'
import Vue from 'vue'
import extendJson from './extends'

const InstanceInput = () => import('@/components/input/index.vue')

let throttle = new Throttle()

class TextareaVueUI extends VueUI {
    constructor(params) {
        super(params)
        this.type = 'textarea'
    }
    renderInstance ({createElement, context}) {
        return createElement('textarea', {...context}, [this.props.label])
    }
}
class InputVueUI extends VueUI {
  constructor(params) {
    super(params)
    this.type = 'input'
    this.rawComponents = ['InstanceInput']
  }
  renderInstance ({createElement, context}) {
    return createElement('InstanceInput', {props: {attrs:this},...context})
  } 
}
class ExtendVueUI extends VueUI {
  constructor(params) {
    super(params)
    this.type = 'extends'
    this.rawComponents = extendJson.extends
    this.extendType = params.extendType
  }
  renderInstance ({createElement, context}) {
    return createElement(this.extendType, {props: {attrs:this},...context})
  } 
}
class InstanceVueUIList extends VueUIList {
  convertSinlgeUI(item) {
      return new VueUI(item)
  }
  handleComponentKey (key) {
    return new Promise(resolve => {
      if (key == 'InstanceInput') {
        Vue.component(key, InstanceInput)
        this.componentHasRendered.add({
          name: 'key',
          data: key
        });
        throttle.do(() => {
          this.load()
        }, 1000)
      } else if (extendJson.extends.includes(key)) { 
        Vue.component(key, {
          data () {
              return {
                  slabel: '1title',
              }
          },
          render(h) {
              return this.render()
          },
          props: ['attrs'],
          created() {
              console.log(this.attrs)
          },
          methods: {
              render() {
                var _vm = this;
                var _h = _vm.$createElement;
                var _c = _vm._self._c || _h;
                return _c('el-col', [_vm._v("什么鬼qqq" + _vm._s(_vm.attrs.props.label))])
              }
          },  
      })
        this.componentHasRendered.add({
          name: 'key',
          data: key
        });
        throttle.do(() => {
          this.load()
        }, 1000)
      }
      resolve();
    });
  }
}

const instanceInit = () => {
    var instance = new InstanceVueUIList([
      {
        type: "input",
        props: {
          label: "inputaaa",
        },
        value: "123123",
        key: "input",
      },
      {
        type: "extends",
        extendType: "extendsInput",
        props: {
          label: "selectaaa",
          multiple: true,
          data: [
            {
              key: "1",
              value: "N1",
            },
            {
              key: "2",
              value: "N2",
            },
          ],
        },
        value: [],
        key: "select",
      },
      {
        type: "textarea",
        props: {
          label: "textareaaaa",
        },
        value: "223223",
        key: "textarea",
      },
    ])
    instance.addTemplate({
        key: 'textarea',
        value: TextareaVueUI
    })
    instance.addTemplate({
      key: 'input',
      value: InputVueUI
    })
    instance.addTemplate({
      key: 'extends',
      value: ExtendVueUI
    })
    
    instance.reset()
    instance.load().then(() => {
    })
    
    return instance
}

export default instanceInit