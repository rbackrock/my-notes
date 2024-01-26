import * as THREE from 'three'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export const resourceType = {
  GLTF: 'gltf_type',
  TEXTURE: 'texture_type'
}

export function getSizes(containerEl) {
  return {
    width: containerEl.offsetWidth,
    height: containerEl.offsetHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
}

/**
 * 
 * @param {Object} resources 要使用的资源对象
 */
export function loadResource(resources) {
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

    for (const k in resources) {
      const current = resources[k]

      if (current.type === resourceType.GLTF) {
        gltfLoader.load(current.path, file => {
          current.file = file
        })
      } else if (current.type === resourceType.TEXTURE) {
        textureLoader.load(current.path, file => {
          current.file = file
        })
      }
    }

    loadManager.onLoad = () => {
      resolve(resources)
    }
    loadManager.onError = () => {
      reject()
    }
  })
}

