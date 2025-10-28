// Cytoscape 그래프 스타일시트 정의

export const getHierarchicalStylesheet = (): any[] => [
  // 클래스 노드 전용 스타일 (컨테이너보다 위에 표시)
  {
    selector: 'node[type = "class"]',
    style: {
      'z-index': 100,
      'overlay-opacity': 0,
      'events': 'yes'
    }
  },
  
  // 기본 노드 스타일 (컨테이너보다 위에 표시)
  {
    selector: 'node',
    style: {
      'z-index': 10,
      'background-color': (node: any) => {
        const type = node.data('type') || 'module';
        
        const colors = {
          package: '#B7FF00',
          module: '#52c41a', 
          class: '#fa8c16',
          method: '#eb2f96',
          field: '#722ed1'
        };
        
        return colors[type as keyof typeof colors] || '#d9d9d9';
      },
      'label': (node: any) => {
        const name = node.data('name') || node.data('id') || 'Node';
        return name;
      },
      'font-size': (node: any) => {
        const level = node.data('level') || 1;
        return Math.max(10, 18 - level * 2) + 'px';
      },
      'width': (node: any) => {
        const level = node.data('level') || 1;
        return Math.max(40, 100 - level * 10);
      },
      'height': (node: any) => {
        const level = node.data('level') || 1;
        return Math.max(30, 80 - level * 8);
      },
      'padding': '100%',
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#000',
      'text-outline-width': 1,
      'text-outline-color': '#fff',
      'border-width': 2,
      'border-color': '#666',
      'text-wrap': 'wrap',
      'text-max-width': '150px',
      'shape': (node: any) => {
        const type = node.data('type') || 'module';
        
        switch (type) {
          case 'package': return 'round-rectangle';
          case 'module': return 'rectangle';
          case 'class': return 'ellipse';
          case 'method': return 'triangle';
          case 'field': return 'diamond';
          default: return 'ellipse';
        }
      }
    }
  },

  // 엣지 스타일
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#888',
      'target-arrow-color': '#888',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    }
  },

  // 루트 타입 전용 스타일 (모듈과 차별화)
  {
    selector: 'node[type = "root"]',
    style: {
      'shape': 'round-rectangle',
      'background-color': '#0050b3',
      'border-color': '#003a8c',
      'border-width': 3,
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#ffffff',
      'text-outline-width': 1,
      'text-outline-color': '#003a8c',
      'font-size': '16px',
      'width': 150,
      'height': 50,
      'z-index': 12
    }
  },

  // Level 0에서 루트를 모듈처럼 보이게 하는 프록시 노드 스타일
  {
    selector: 'node.root-as-module',
    style: {
      'shape': 'round-rectangle',
      'background-color': '#2db7f5',
      'border-color': '#096dd9',
      'border-width': 3,
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#ffffff',
      'text-outline-width': 1,
      'text-outline-color': '#0958d9',
      'font-size': '16px',
      'width': 140,
      'height': 46,
      'z-index': 11
    }
  },

  // package-container 스타일 (최상위 컨테이너)
  {
    selector: '.package-container',
    style: {
      'padding': '5%',
      'shape': 'round-rectangle',
      'background-color': '#B0FFB0',
      'background-opacity': 0.05,
      'border-width': 3,
      'border-color': '#8c8c8c',
      'label': '',
      'font-size': '25px',
      'color': '#FFFFFF',
      'text-opacity': 0,
      'z-index': 0,
      'events': 'no'
    }
  },

  // show-label 클래스가 붙은 패키지 컨테이너만 라벨 표기
  {
    selector: '.package-container.show-label',
    style: {
      'label': 'data(label)',
      'text-opacity': 1,
      'text-halign': 'left',
      'text-valign': 'top',
      'text-margin-x': 140,
      'text-margin-y': -10,
      'text-font-size': '100px',
      'text-background-opacity': 0.9,
      'text-background-color': '#207000',
      'text-background-padding': 2,
      'text-background-shape': 'round-rectangle'
    }
  },

  // 모듈 컨테이너 스타일
  {
    selector: '.module-container',
    style: {
      'padding': '5%',
      'shape': 'round-rectangle',
      'background-color': '#00FF55',
      'background-opacity': 0.08,
      'border-width': 2,
      'border-color': '#52c41a',
      'label': '',
      'text-opacity': 0,
      'z-index': 1,
      'overlay-opacity': 0,
      'events': 'no'
    }
  },

  // 클래스 컨테이너 스타일
  {
    selector: '.class-container',
    style: {
      'padding': '10%',
      'shape': 'round-rectangle',
      'background-color': '#E5FF00',
      'background-opacity': 0.05,
      'border-width': 2,
      'border-color': '#d4b106',
      'label': '',
      'text-opacity': 0,
      'z-index': 2,
      'overlay-opacity': 0,
      'events': 'no'
    }
  },

  // Dimmed 상태
  {
    selector: 'node.dimmed',
    style: {
      'opacity': 0.3
    }
  },

  // 컨테이너 노드 공통 스타일
  {
    selector: 'node:parent',
    style: {
      'background-opacity': 0.1,
      'text-outline-width': 0
    }
  },

  // 하이라이트 상태
  {
    selector: 'node.highlighted',
    style: {
      'border-color': '#1E90FF',
      'opacity': 1,
      'border-width': 5,
      'z-index': 999
    }
  },

  {
    selector: 'node.connected',
    style: {
      'border-color': '#FF5100',
      'border-width': 4,
      'opacity': 1
    }
  },

  {
    selector: 'edge.highlighted',
    style: {
      'line-color': '#1E90FF',
      'target-arrow-color': '#1E90FF',
      'width': 4
    }
  },
  
  // 순환 참조 엣지 스타일
  {
    selector: 'edge.cycle-edge',
    style: {
      'line-color': '#ff4d4f',
      'target-arrow-color': '#ff4d4f',
      'source-arrow-color': '#ff4d4f',
      'width': 4,
      'line-style': 'solid',
      'opacity': 1,
      'curve-style': 'bezier',
      'z-index': 50,
      'arrow-scale': 1.5
    }
  },

  {
    selector: 'edge.dimmed',
    style: {
      'opacity': 0.3
    }
  },
];

