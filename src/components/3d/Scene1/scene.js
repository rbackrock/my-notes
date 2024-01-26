import {
  ref,
  onMounted
} from 'vue'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

function getSizes(containerEl) {
  return {
    width: containerEl.offsetWidth,
    height: containerEl.offsetHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
}

function loadResource(sceneEl) {
  return new Promise((resolve, reject) => {
    // 加载器
    const loadManager = new THREE.LoadingManager()
    // 材质加载器
    const textureLoader = new THREE.TextureLoader(loadManager)
    // 模型压缩加载器
    const dracoLoader = new DRACOLoader(loadManager)
    dracoLoader.setDecoderPath('/draco/')
    // 模型加载器
    const gltfLoader = new GLTFLoader(loadManager)
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load('/3d/scene1/learn-bake-fix.glb', file => {
      console.log(file)
    })

    textureLoader.load('/3d/scene1/bake.jpg', file => {
      console.log(file)
    })

    loadManager.onLoad = () => {
      resolve()
    }
    loadManager.onError = () => {
      reject()
    }
  })
}

export default function useScene() {
  const sceneRef = ref(null)

  onMounted(() => {
    console.log(sceneRef.value)

    loadResource()
  })

  return {
    sceneRef
  }
}