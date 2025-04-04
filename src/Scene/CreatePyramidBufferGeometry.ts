import * as THREE from 'three'

export const createPyramidBufferGeometry = (size: number) => {
  const geometry = new THREE.BufferGeometry()

  const s = size / 2
  const vertices = new Float32Array([
    0,
    s,
    0, // 0: Вершина
    -s,
    -s,
    s, // 1: Основание, левый-ближний
    s,
    -s,
    s, // 2: Основание, правый-ближний
    0,
    -s,
    -s, // 3: Основание, дальний
  ])

  const indices = new Uint16Array([
    0,
    1,
    2, // Грань 1
    0,
    2,
    3, // Грань 2
    0,
    3,
    1, // Грань 3
    1,
    3,
    2, // Грань 4 (основание)
  ])

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))

  // Группы для каждой грани
  geometry.clearGroups()
  geometry.addGroup(0, 3, 0) // Грань 1
  geometry.addGroup(3, 3, 1) // Грань 2
  geometry.addGroup(6, 3, 2) // Грань 3
  geometry.addGroup(9, 3, 3) // Грань 4

  return geometry
}
