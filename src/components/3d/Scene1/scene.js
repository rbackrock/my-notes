import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  resourceType,
  loadResource,
  getSizes
} from '../../../utils/3d.js'
import portalDoorVertexShader from './shaders/portalDoor/vertex.glsl'
import portalDoorFragmentShader from './shaders/portalDoor/fragment.glsl'
import firefliesVertextShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'


export default function useScene() {
  const cavansRef = ref(null)
  let onResizeHandleFn = null
  let renderer = null
  let scene = null
  let controls = null

  function calcCameraPosition(width, height) {
    // 默认横屏
    const position = {
      x: -3.8,
      y: 2.04,
      z: -3.59
    }

    if (width < height) {
      // 竖屏
      position.x = -10.6
      position.y = 5.6
      position.z = -10
    }

    return position
  }

  function onResizeHandle(renderer, camera, firefliesMaterial) {
    const {
      width,
      height,
      pixelRatio
    } = getSizes(cavansRef.value)
    const {
      x,
      y,
      z
    } = calcCameraPosition(width, height)

    camera.aspect = width / height
    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(pixelRatio)

    firefliesMaterial.uniforms.uPixelRatio.value = pixelRatio
  }

  onMounted(() => {
    loadResource({
      gltfFile: {
        type: resourceType.GLTF,
        path: '/3d/scene1/learn-bake-fix.glb'
      },
      bakeTextureFile: {
        type: resourceType.TEXTURE,
        path: '/3d/scene1/bake.jpg'
      }
    }).then(({ bakeTextureFile, gltfFile  }) => {
      const {
        width,
        height,
        pixelRatio
      } = getSizes(cavansRef.value)
      const bakedTexture = bakeTextureFile.file
      const gltf = gltfFile.file
      scene = new THREE.Scene()
      const canvasEl = cavansRef.value

      /**
       * 处理烘焙纹理
       */
      bakedTexture.flipY = false
      bakedTexture.colorSpace = THREE.SRGBColorSpace
      const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

      /**
       * 创建处理萤火虫几何
       */
      const firefliesGeometry = new THREE.BufferGeometry()
      // 30 个萤火虫
      const firefliesCount = 30
      // 顶点位置描述是 xyz 所有要乘以3
      const firefliesPosition = new Float32Array(firefliesCount * 3)
      for(let i = 0; i < firefliesCount; i++) {
        // 在 blender 建模的时候，地板大小是 4x4 个单位
        firefliesPosition[i * 3 + 0] = (Math.random() - 0.5) * 4
        firefliesPosition[i * 3 + 1] = Math.random() * 1.5
        firefliesPosition[i * 3 + 2] = (Math.random() - 0.5) * 4
      }
      // 用用随机生成的坐标关联到位置属性上
      firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(firefliesPosition, 3))
      // 创造每个顶点随机大小
      const randomScaleArray = new Float32Array(firefliesCount)
      for(let i = 0; i < firefliesCount; i++) {
        randomScaleArray[i] = Math.random()
      }
      firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(randomScaleArray, 1))

      /**
       * 创建萤火虫材质
       */
      const firefliesMaterial = new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexShader: firefliesVertextShader,
        fragmentShader: firefliesFragmentShader,
        uniforms: {
          // 传递给着色器的是设备像素比，保证在高分辨率下的顶点大小一致
          uPixelRatio: {
            value: pixelRatio
          },
          // 粒子大小
          uSize: {
            value: 160
          },
          // 每帧花费时间用作动画
          uTime: {
            value: 0
          }
        }
      })
      // 点材质表现萤火虫
      const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
      scene.add(fireflies)

      /**
       * 创建处理能量门材质
       */
      const portalLightMaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        vertexShader: portalDoorVertexShader,
        fragmentShader: portalDoorFragmentShader,
        // 每帧花费时间用作动画
        uniforms: {
          uTime: {
            value: 0
          },
          uColorStart: {
            value: new THREE.Color(0xffffff)
          },
          uColorEnd: {
            value: new THREE.Color(0x2abaff)
          }
        }
      })

      /**
       * 处理模型
       */
      gltf.scene.traverse(child => {
        child.material = bakedMaterial
  
        if (child.name === '圆环') {
          child.material = portalLightMaterial
        }
      })
      scene.add(gltf.scene)

      /**
       * 创建渲染器
       */
      renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        antialias: true,
        alpha: true
      })
      const clock = new THREE.Clock()
      renderer.setSize(width, height)
      renderer.setPixelRatio(pixelRatio)
      renderer.outputColorSpace = THREE.SRGBColorSpace

      /**
       * 创建相机和控制器
       */
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      const {
        x,
        y,
        z
      } = calcCameraPosition(width, height)
      camera.position.x = x
      camera.position.y = y
      camera.position.z = z
      scene.add(camera)
      // 控制器
      controls = new OrbitControls(camera, renderer.domElement)
      // 阻尼
      controls.enableDamping = true

      /**
       * 循环动画帧
       */
      renderer.setAnimationLoop(() => {
        const elapsedTime = clock.getElapsedTime()
        controls.update()
        renderer.render(scene, camera)

        // 为了萤火虫动画
        firefliesMaterial.uniforms.uTime.value = elapsedTime
        // 为了神秘力量的门动画
        portalLightMaterial.uniforms.uTime.value = elapsedTime
      })

      onResizeHandleFn = onResizeHandle.bind(null, renderer, camera, firefliesMaterial)
      window.addEventListener('resize', onResizeHandleFn)
    })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResizeHandleFn)

    // 释放 3D 资源
    if (scene !== null) {
      scene.traverse(mesh => {
        if (mesh.geometry) {
          mesh.geometry.dispose()
        }
  
        for (const key in mesh.material) {
          const value = mesh.material[key]
  
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      })
    }

    if (controls !== null) {
      controls.dispose()
    }

    if (renderer !== null) {
      renderer.dispose()
    }
  })

  return {
    cavansRef
  }
}