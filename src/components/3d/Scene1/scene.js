import {
  ref,
  onMounted
} from 'vue'
import * as THREE from 'three'
import {
  resourceType,
  loadResource
} from '../../../utils/3d.js'


export default function useScene() {
  const sceneRef = ref(null)

  onMounted(() => {
    loadResource({
      gltf: {
        type: resourceType.GLTF,
        path: '/3d/scene1/learn-bake-fix.glb'
      },
      bakeTexture: {
        type: resourceType.TEXTURE,
        path: '/3d/scene1/bake.jpg'
      }
    }).then(resource => {
      console.log(resource)
    })
  })

  return {
    sceneRef
  }
}