import React from 'react';
import PropTypes from 'prop-types';

export const TranscribeItem = ({transcribe, index, updateInput, formSubmitHandler, deleteHandler}) => {
    return (
        <tr>
            <td>{transcribe.id}</td>
            <td>
                <input type="text" name="speaker" onChange={e => updateInput(e, index)} value={transcribe.speaker}
                       className="form-control"/>
            </td>
            <td>
                <textarea name="content" onChange={e => updateInput(e, index)} value={transcribe.content}
                          className="form-control"/>
            </td>
            <td>
                <div className="actions">
                    <button type="button" className="btn btn-info btn-sm"
                            onClick={e => formSubmitHandler(e, index)}>
                        <i className="fas fa-trash"/> Edit
                    </button>
                    <button type="button" className="btn btn-danger btn-sm"
                            onClick={e => deleteHandler(e, transcribe.id)}>
                        <i className="fas fa-trash"/> Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

TranscribeItem.propTypes = {
    transcribe: PropTypes.object,
    index: PropTypes.number,
    updateInput: PropTypes.func,
    formSubmitHandler: PropTypes.func,
    deleteHandler: PropTypes.func
};
