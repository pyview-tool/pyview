// 그래프와 컨트롤이 있는 시각화 페이지
import React, { useState, useEffect } from 'react'
import { Row, Col, message, Alert } from 'antd'
import { ApiService } from '@/services/api'
import HierarchicalNetworkGraph from './HierarchicalNetworkGraph'
import FileTreeSidebar from '../FileTree/FileTreeSidebar'
import { transformAnalysisToGraph } from './transformAnalysisToGraph'

interface VisualizationPageProps {
  analysisId: string | null
}

interface GraphData {
  nodes: Array<{
    id: string
    name: string
    type: 'package' | 'module' | 'class' | 'method' | 'field'
    x: number
    y: number
    z: number
    connections: string[]
  }>
  edges: Array<{
    source: string
    target: string
    type: 'import' | 'inheritance' | 'composition' | 'call' | 'reference' | 'contains'
  }>
}

const VisualizationPage: React.FC<VisualizationPageProps> = ({ analysisId }) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [isFetching, setIsFetching] = useState(false)  // GET 대기 상태
  const [graphBusy, setGraphBusy] = useState(false)    // 그래프 변환/렌더 상태
  const [error, setError] = useState<string | null>(null)
  
  // Graph control states - only hierarchical mode
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  // 순환참조 데이터 추출 함수
  const extractCycleData = (analysisResults: any) => {
    if (!analysisResults || !analysisResults.cycles) {
      return { cycles: [] };
    }
    
    console.log('📊 Extracted cycle data:', analysisResults.cycles);
    return {
      cycles: analysisResults.cycles
    };
  };

  // Load analysis data
  useEffect(() => {
    if (!analysisId) return

    let isMounted = true;
    const abortController = new AbortController();

    const loadAnalysisData = async () => {
      try {
        // ① GET 요청 대기 오버레이 ON
        setIsFetching(true)
        setError(null)

        const results = await ApiService.getAnalysisResults(analysisId)

        if (!isMounted || abortController.signal.aborted) return;

        // Store raw analysis results for file tree
        setAnalysisResults(results)
        
        // ② GET 요청 대기 오버레이 OFF
        setIsFetching(false)

        // ③ 그래프 변환/렌더 구간은 "그래프 오버레이"로 통합
        setGraphBusy(true)
        
        // Use setTimeout to allow UI to update before heavy computation
        await new Promise(resolve => setTimeout(resolve, 100))

        if (!isMounted || abortController.signal.aborted) return;

        // Transform data (변환만 수행, onGraphReady에서 최종 OFF)
        const transformedData = await transformAnalysisToGraph(results)
        
        if (!isMounted || abortController.signal.aborted) return;

        setGraphData(transformedData)
        // graphBusy는 onGraphReady에서 끔
        
      } catch (err) {
        if (isMounted && !abortController.signal.aborted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load analysis data'
          setError(errorMessage)
          message.error(errorMessage)
        }
        setIsFetching(false)
        setGraphBusy(false)
      }
    }

    loadAnalysisData()

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [analysisId])


  // Get node information from graph data
  const getNodeInfo = (nodeId: string): { type: string; name: string } => {
    console.log('🔍 getNodeInfo called with nodeId:', nodeId)

    // Try to find the node in graph data first
    if (graphData) {
      const node = graphData.nodes.find(n => n.id === nodeId)
      console.log('📊 Found node in graphData:', node)

      if (node) {
        const type = node.type.charAt(0).toUpperCase() + node.type.slice(1)
        const result = { type, name: node.name }
        console.log('✅ Returning from graphData:', result)
        return result
      }
    }

    // Fallback: parse from nodeId if not found in graph data
    console.log('⚠️ Node not found in graphData, using fallback parsing')

    // Remove common prefixes and parse
    let cleanNodeId = nodeId
    if (nodeId.startsWith('mod:')) {
      cleanNodeId = nodeId.replace('mod:', '')
      return { type: 'Module', name: cleanNodeId }
    } else if (nodeId.startsWith('cls:')) {
      cleanNodeId = nodeId.replace('cls:', '')
      return { type: 'Class', name: cleanNodeId }
    } else if (nodeId.startsWith('method:')) {
      cleanNodeId = nodeId.replace('method:', '')
      return { type: 'Method', name: cleanNodeId }
    } else if (nodeId.startsWith('field:')) {
      cleanNodeId = nodeId.replace('field:', '')
      return { type: 'Field', name: cleanNodeId }
    } else if (nodeId.includes('/')) {
      const name = nodeId.split('/').pop() || nodeId
      return { type: 'File', name }
    } else {
      return { type: 'Node', name: nodeId }
    }
  }

  // Unified node selection handler
  const handleNodeSelection = (nodeId: string, source: 'file-tree' | 'graph', nodeType?: string) => {
    console.log(`${source === 'file-tree' ? '🌳 File tree' : '🎯 Graph'} selected:`, nodeId, nodeType || '')
    setSelectedNodeId(nodeId)

    // Try to get info from graph data first, then fallback to nodeType if provided
    const { type, name } = getNodeInfo(nodeId)

    // If getNodeInfo couldn't find it and we have nodeType from file tree, use that
    if (type === 'Node' && nodeType && source === 'file-tree') {
      const parsedName = nodeId.includes('/') ? nodeId.split('/').pop() || nodeId : nodeId
      const parsedType = nodeType.charAt(0).toUpperCase() + nodeType.slice(1)
      console.log('🔄 Using nodeType fallback:', { type: parsedType, name: parsedName })
      message.info(`선택된 ${parsedType}: ${parsedName}`)
    } else {
      console.log('✅ Using getNodeInfo result:', { type, name })
      message.info(`선택된 ${type}: ${name}`)
    }
  }

  // File tree node selection handler (wrapper)
  const handleFileTreeNodeSelect = (nodeId: string, nodeType: string) => {
    handleNodeSelection(nodeId, 'file-tree', nodeType)
  }

  // Graph node click handler (wrapper)
  const handleGraphNodeClick = (nodeId: string) => {
    handleNodeSelection(nodeId, 'graph')
  }

  if (error) {
    return (
      <Alert
        message="시각화 오류"
        description={error}
        type="error"
        showIcon
        style={{ margin: '24px 0' }}
      />
    )
  }

  if (!analysisId && !graphData) {
    return (
      <Alert
        message="분석이 선택되지 않음"
        description="의존성 그래프를 시각화하려면 먼저 분석을 실행해 주세요."
        type="info"
        showIcon
        style={{ margin: '24px 0' }}
      />
    )
  }

  return (
    <div>

      <Row gutter={[16, 16]}>
        {/* File Tree Column - 조건부 렌더링 */}
        {analysisResults && (
          <Col xs={24} sm={6} md={6} lg={5}>
            <FileTreeSidebar
              analysisData={analysisResults}
              cycleData={extractCycleData(analysisResults)}
              onNodeSelect={handleFileTreeNodeSelect}
              selectedNodeId={selectedNodeId || undefined}
              style={{ height: 'calc(100vh - 200px)' }}
            />
          </Col>
        )}
        
        {/* Graph Column */}
        <Col xs={24} sm={analysisResults ? 18 : 24} md={analysisResults ? 18 : 24} lg={analysisResults ? 19 : 24}>
          {/* 계층형 네트워크 그래프 */}
          <HierarchicalNetworkGraph
            data={graphData || undefined}
            cycleData={extractCycleData(analysisResults)}
            onNodeClick={handleGraphNodeClick}
            selectedNodeId={selectedNodeId || undefined}
            projectName={analysisResults?.project_info?.name}
            // 📌 공용 오버레이: GET 대기 또는 그래프 바쁨일 때 ON
            overlayVisible={isFetching || graphBusy}
            overlayTitle={isFetching ? '분석된 파일의 정보를 받아오고 있습니다.' : undefined}
            onGraphReady={() => setGraphBusy(false)}
          />
        </Col>
      </Row>
    </div>
  )
}

export default VisualizationPage