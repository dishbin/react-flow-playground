import React from 'react';
import ReactFlow, {
    isNode,
    getOutgoers,
    getIncomers,
} from 'react-flow-renderer';

function DetailBox({element, elements}) {

    let outgoers = [], incomers = [];

    if (element && isNode(element)) {
        outgoers = getOutgoers(element, elements);
        incomers = getIncomers(element, elements);
    }

    let sourceNode, targetNode;

    if ((element && (!isNode(element)))) {
        sourceNode = elements.find(x => x.id === element.source);
        targetNode = elements.find(x => x.id === element.target);
    }
    
    return (
        <div 
            style={{
                overflowY: 'scroll'
            }}
        >
            {(element) ?
                <div>
                    <p>{(isNode(element) ? 'this element is a node' : 'this element is an edge')}</p>
                    {(isNode(element) && element.data.label) &&
                        <p>label: {element.data.label}</p>
                    }

                    {(!isNode(element)) && 
                        <div>
                            <hr />
                            <p>{`this edge connects '${sourceNode.data.label}' to '${targetNode.data.label}''`}</p>
                        </div>
                    }
                    
                    {(incomers.length > 0) &&
                        <div>
                            <hr />
                            <p>incoming nodes</p>
                            {incomers.map(x => {
                                return <p key={x.id}>{x.data.label}</p>
                            })}
                        </div>
                    }
                    {(outgoers.length > 0) &&
                        <div>
                            <hr />
                            <p>outgoing nodes</p>
                            {outgoers.map(x => {
                                return <p key={x.id}>{x.data.label}</p>
                            })}
                        </div>
                    }
                </div>
            :   <div>
                    <p>click on a node or edge to see details</p>
                </div>
            }
        </div>
    );
}

export default DetailBox;