import React from 'react';

type ReactComponent = React.ComponentType<any>;

interface ChildProps  {
    id: string,
    innerChild:  ReactComponent
}

const Modal: React.FC<ChildProps > = ({ id, innerChild: InnerChild }) => {
    return (
        <dialog id={id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <InnerChild id = {id}/>
            </div>
        </dialog>
    );
};

export default Modal;
