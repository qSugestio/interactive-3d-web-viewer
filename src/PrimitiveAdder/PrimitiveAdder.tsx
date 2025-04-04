import { Checkbox, Form, InputNumber, Modal, Select } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { Primitive } from '../App'

export interface PrimitiveFormData {
  type: 'box' | 'pyramid'
  length: number
  width: number
  height: number
  count: number
  isRandomSideColors: boolean
}

const PrimitiveAdder = ({
  isModalOpen,
  setIsModalOpen,
  primitives,
  setPrimitives,
}: {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  primitives: Primitive[]
  setPrimitives: Dispatch<SetStateAction<Primitive[]>>
}) => {
  const [form] = Form.useForm()

  const handleCancel = () => setIsModalOpen(false)

  const randomPos = () => Math.floor((Math.random() - 0.5) * 10) // -5 - 5

  const handleFinish = (values: PrimitiveFormData) => {
    const newPrimitives: Primitive[] = []

    for (let i = 0; i < values.count; i++) {
      const randomPosition: [number, number, number] = [
        randomPos(), //x
        randomPos(), //y
        randomPos(), //z
      ]
      const generateRandomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`
      const randomColor = generateRandomColor()

      const sideCount = values.type === 'box' ? 6 : 4

      newPrimitives.push({
        id: `${values.type}-${primitives.length + i}`,
        type: values.type,
        size: [values.length, values.width, values.height],
        position: randomPosition,
        colors: Array(sideCount)
          .fill(null)
          .map(() =>
            values.isRandomSideColors ? generateRandomColor() : randomColor
          ),
      })
    }
    setPrimitives(prev => [...prev, ...newPrimitives])

    handleCancel()
    form.resetFields()
  }

  return (
    <Modal
      title='Add Primitive Group'
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout='vertical'
        initialValues={{ type: 'box', isRandomSideColors: false }}
      >
        <Form.Item
          name='type'
          label='Primitive Type'
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value='box'>Box</Select.Option>
            <Select.Option value='pyramid'>Pyramid</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='length' label='Length' rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name='width' label='Width' rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name='height' label='Height' rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name='count' label='Count' rules={[{ required: true }]}>
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item name='isRandomSideColors' valuePropName='checked'>
          <Checkbox>Random Side Colors</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PrimitiveAdder
