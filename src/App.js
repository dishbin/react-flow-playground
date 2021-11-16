import './App.css';
import ReactFlow, { addEdge, Controls } from 'react-flow-renderer';
import { useEffect, useState } from 'react';
import AddNodeModal from './components/AddNodeModal';
import DetailBox from './components/DetailBox';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [elements, setElements] = useState(null);
  const [focusElement, setFocusElement] = useState(null);

  const seedElements = [
    {
      id: '1',
      type: 'input',
      data: {label: 'an input node'},
      position: {x: 200, y: 100}
    },
    {
      id: '2',
      data: {label: 'just a regular ol\' node'},
      position: {x: 100, y: 150}
    },
    {
      id: '3',
      type: 'output',
      data: {label: 'an output node'},
      position: {x: 200, y: 200}
    },
    {
      id: 'e1-2',
      source: '1',
      target: '2'
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3'
    }
  ]

  useEffect(() => {
    setElements(seedElements);
  }, [])

  const onElementClick = (e, el) => {
    setFocusElement(el);
  }

  const onConnect = (params) => {
    let source = params.source, target = params.target;
    setElements((els) => addEdge({source, target}, els));
  };


  return (
    <div className="App">
      {(showModal) && 
        <AddNodeModal 
          elements={elements} 
          setElements={setElements} 
          showModal={showModal} 
          setShowModal={setShowModal}
          />
      }
      <h1>messin' around with React Flow</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: 900,
          margin: 'auto',
        }}
      >
        {(elements) && 
          <div style={{
              width: 500, 
              height: 500, 
              margin: 'auto', 
              border: '2px solid black',
              }}>
            <ReactFlow 
              elements={elements} 
              onConnect={onConnect}
              onElementClick={onElementClick}
            >
              <Controls />
            </ReactFlow>
          </div>
        }
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <div 
            style={{
              width: 300,
              height: 400,
              padding: '1em',
              margin: '1em',
            }}
          >
            {(elements) &&
              <DetailBox 
                element={focusElement} 
                elements={elements}
              />
            }
          </div>
          <button style={{width: 150, margin: 'auto'}}type='button' onClick={() => setShowModal(!showModal)} >add node</button>
        </div>
      </div>
    </div>
  );
}

export default App;
