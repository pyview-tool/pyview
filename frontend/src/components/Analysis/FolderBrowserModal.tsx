import React, { useState, useEffect } from 'react'
import { Modal, List, Button, Space, Spin, message, Typography } from 'antd'
import { FolderOutlined, FolderOpenOutlined, HomeOutlined, ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Text } = Typography

interface DirectoryItem {
  name: string
  path: string
  is_directory: boolean
  has_python_files: boolean
}

interface BrowseDirectoryResponse {
  current_path: string
  parent_path: string | null
  directories: DirectoryItem[]
}

interface FolderBrowserModalProps {
  visible: boolean
  onCancel: () => void
  onSelect: (path: string) => void
}

const FolderBrowserModal: React.FC<FolderBrowserModalProps> = ({ visible, onCancel, onSelect }) => {
  const [currentPath, setCurrentPath] = useState<string>('')
  const [parentPath, setParentPath] = useState<string | null>(null)
  const [directories, setDirectories] = useState<DirectoryItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  // Load home directory when modal opens
  useEffect(() => {
    if (visible) {
      loadDirectory('')
    }
  }, [visible])

  const loadDirectory = async (path: string) => {
    setLoading(true)
    try {
      const response = await axios.get<BrowseDirectoryResponse>(
        'http://localhost:8000/api/browse-directory',
        {
          params: { path: path || '' }
        }
      )

      setCurrentPath(response.data.current_path)
      setParentPath(response.data.parent_path)
      setDirectories(response.data.directories)
    } catch (error: any) {
      console.error('Failed to load directory:', error)
      if (error.response?.status === 403) {
        message.error('폴더에 접근할 권한이 없습니다')
      } else if (error.response?.status === 404) {
        message.error('폴더를 찾을 수 없습니다')
      } else {
        message.error('폴더를 불러오는데 실패했습니다')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDirectoryClick = (path: string) => {
    loadDirectory(path)
  }

  const handleGoUp = () => {
    if (parentPath) {
      loadDirectory(parentPath)
    }
  }

  const handleGoHome = () => {
    loadDirectory('')
  }

  const handleSelectCurrent = () => {
    onSelect(currentPath)
    onCancel()
  }

  return (
    <Modal
      title="폴더 선택"
      open={visible}
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          취소
        </Button>,
        <Button key="select" type="primary" onClick={handleSelectCurrent}>
          현재 폴더 선택
        </Button>
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {/* Navigation Controls */}
        <Space>
          <Button
            icon={<HomeOutlined />}
            onClick={handleGoHome}
            disabled={loading}
          >
            홈
          </Button>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleGoUp}
            disabled={!parentPath || loading}
          >
            상위 폴더
          </Button>
        </Space>

        {/* Current Path Display */}
        <div style={{ padding: '8px 12px', background: '#f5f5f5', borderRadius: 4 }}>
          <Text strong>현재 경로: </Text>
          <Text code>{currentPath || '로딩 중...'}</Text>
        </div>

        {/* Directory List */}
        <Spin spinning={loading}>
          <div style={{ maxHeight: 400, overflow: 'auto', border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <List
              dataSource={directories}
              locale={{ emptyText: '하위 폴더가 없습니다' }}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: 'pointer', padding: '12px 16px' }}
                  onClick={() => handleDirectoryClick(item.path)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <List.Item.Meta
                    avatar={
                      item.has_python_files ? (
                        <FolderOpenOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                      ) : (
                        <FolderOutlined style={{ fontSize: 20, color: '#8c8c8c' }} />
                      )
                    }
                    title={
                      <Space>
                        <span>{item.name}</span>
                        {item.has_python_files && (
                          <FileTextOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                        )}
                      </Space>
                    }
                    description={item.has_python_files ? 'Python 파일 포함' : ''}
                  />
                </List.Item>
              )}
            />
          </div>
        </Spin>
      </Space>
    </Modal>
  )
}

export default FolderBrowserModal
