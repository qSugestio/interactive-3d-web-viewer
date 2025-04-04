import * as THREE from 'three'

export const createBoxBufferGeometry = (
  length: number,
  width: number,
  height: number
) => {
  const geometry = new THREE.BufferGeometry()

  // Половина размеров для центрирования
  const l = length / 2
  const w = width / 2
  const h = height / 2

  // 8 вершин куба
  const vertices = new Float32Array([
    -l,
    -w,
    -h, // 0: левый-нижний-ближний
    l,
    -w,
    -h, // 1: правый-нижний-ближний
    l,
    w,
    -h, // 2: правый-верхний-ближний
    -l,
    w,
    -h, // 3: левый-верхний-ближний
    -l,
    -w,
    h, // 4: левый-нижний-дальний
    l,
    -w,
    h, // 5: правый-нижний-дальний
    l,
    w,
    h, // 6: правый-верхний-дальний
    -l,
    w,
    h, // 7: левый-верхний-дальний
  ])

  // Индексы для 12 треугольников (6 сторон × 2 треугольника), против часовой стрелки для внешних сторон
  const indices = new Uint16Array([
    0,
    3,
    2,
    0,
    2,
    1, // Передняя (Z = -h, смотрит наружу)
    5,
    6,
    7,
    5,
    7,
    4, // Задняя (Z = h, смотрит наружу)
    3,
    7,
    6,
    3,
    6,
    2, // Верхняя (Y = w, смотрит наружу)
    0,
    1,
    5,
    0,
    5,
    4, // Нижняя (Y = -w)
    0,
    7,
    3,
    0,
    4,
    7, // Левая (X = -l, смотрит наружу)
    1,
    2,
    6,
    1,
    6,
    5, // Правая (X = l, смотрит наружу)
  ])

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))

  // Группы для каждой стороны
  geometry.clearGroups()
  geometry.addGroup(0, 6, 0) // Передняя (индексы 0-5)
  geometry.addGroup(6, 6, 1) // Задняя (6-11)
  geometry.addGroup(12, 6, 2) // Верхняя (12-17)
  geometry.addGroup(18, 6, 3) // Нижняя (18-23)
  geometry.addGroup(24, 6, 4) // Левая (24-29)
  geometry.addGroup(30, 6, 5) // Правая (30-35)

  return geometry
}
