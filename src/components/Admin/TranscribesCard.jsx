import React from 'react';
import PropTypes from 'prop-types';
import {TranscribeItem} from "@/components/Admin/TranscribeItem";

export const TranscribesCard = ({transcribes, updateInput, formSubmitHandler, deleteHandler}) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Transcribes</h3>
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                            title="Collapse"><i className="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped projects">
                    <thead>
                    <tr>
                        <th style={{width: "1%"}}>ID</th>
                        <th style={{width: "10%"}}>Speaker</th>
                        <th style={{width: "50%"}}>Content</th>
                        <th style={{width: "10%"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        transcribes ? transcribes.map((transcribe, index) =>
                            <TranscribeItem transcribe={transcribe} deleteHandler={deleteHandler} index={index}
                                            formSubmitHandler={formSubmitHandler} updateInput={updateInput}
                                            key={transcribe.id}/>
                        ) : null
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

TranscribesCard.propTypes = {
    transcribes: PropTypes.array,
    updateInput: PropTypes.func,
    formSubmitHandler: PropTypes.func,
    deleteHandler: PropTypes.func
};
