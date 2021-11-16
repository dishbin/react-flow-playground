import React, {useState} from 'react';

function AddNodeModal({elements, setElements, showModal, setShowModal}) {


    let nodes = elements.filter(x => x.id.includes('e') === false);
    let lastNode = nodes.at(-1);

    let newNodeDefault = {
        id: (parseInt(lastNode.id) + 1).toString(),
        data: {label: ''},
        position: {x: 0, y: 0}
    }

    const [newNode, setNewNode] = useState(newNodeDefault);
    const [nodeType, setNodeType] = useState('default');

    const handleChange = (e) => {
        setNewNode({...newNode, data: {label: e.target.value}});
    }

    const handleClick = (e) => {
        setNodeType(e.target.value);
    }

    const handleSubmit = () => {
        let nodeToAdd = {...newNode};
        if (nodeType !== 'default') {
            nodeToAdd['type'] = nodeType;
        }
        let edges = elements.filter(x => x.id.includes('e') === true);
        let newElements = [...nodes, nodeToAdd, ...edges];
        setElements(newElements);
        setShowModal(false);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <p>enter a lable for your new node</p>
                <input id='data.label' type='text' placeholder='label' onChange={handleChange} />
                <hr />
                <p>select node type</p>
                <p>type: {nodeType}</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: 200,
                    margin: '0.5em auto',
                }}>
                    <button type='button' value='default' onClick={handleClick}>default</button>
                    <button type='button' value='input' onClick={handleClick}>input</button>
                    <button type='button' value='output' onClick={handleClick}>output</button>
                </div>
                <hr />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <button style={{width: 100, margin: '0.25em auto'}} type='button' onClick={handleSubmit} >add node</button>
                    <button style={{width: 100, margin: '0.25em auto'}} type='button' onClick={() => setShowModal(!showModal)} >close modal</button>
                </div>
                
            </div>
        </div>
    );
}

export default AddNodeModal;