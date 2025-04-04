import { PlusOutlined } from '@ant-design/icons'
import { Button, List } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { Primitive } from '../App'
import styles from './Sidebar.module.css'

const Sidebar = ({
  primitives,
  setIsModalOpen,
  setPrimitives,
  selectedItem,
  setSelectedItem,
}: {
  primitives: Primitive[]
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setPrimitives: Dispatch<SetStateAction<Primitive[]>>
  selectedItem: string
  setSelectedItem: Dispatch<SetStateAction<string>>
}) => {
  return (
    <div className={styles.sidebar}>
      <List
        className={styles.listOfPrimitives}
        dataSource={primitives}
        renderItem={item => (
          <List.Item
            onClick={() =>
              setSelectedItem(
                item.type + '-' + item.id.charAt(item.id.length - 1)
              )
            }
            style={{
              cursor: 'pointer',
              background:
                item.type + '-' + item.id.charAt(item.id.length - 1) ===
                selectedItem
                  ? '#e6f7ff'
                  : '',
            }}
          >
            <div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: item.colors[0],
                }}
              />
            </div>
            <div>
              {`${item.id} at (${item.position
                .map(p => p.toFixed(2))
                .join(', ')})`}
            </div>
          </List.Item>
        )}
      ></List>
      <div className={styles.controllers}>
        <Button onClick={() => setPrimitives([])}>Clear Scene</Button>
        <Button icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Add Group
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
