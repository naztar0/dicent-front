import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from "@/components/Avatar";
import {colorChar} from "@/context/utils";

export const Transcribe = ({trans, index, changeTranscribeData, updateTranscribeInput}) => {
    return (
        <div className="d-flex flex-row mb-2" key={index}>
            <Avatar username={trans.speaker} size={40} align='end'/>
            <div className="msg-corner">
                <div/>
            </div>
            <div className="transcribe">
                <input type="text" name="speaker" value={trans.speaker}
                       className="props speaker"
                       style={{color: colorChar(trans.speaker)}}
                       onKeyDown={e => changeTranscribeData(e, index)}
                       onChange={e => updateTranscribeInput(e, index)}/>
                <textarea name="content" value={trans.content}
                          className="props content-text"
                          onKeyDown={e => changeTranscribeData(e, index)}
                          onChange={e => updateTranscribeInput(e, index)}/>
            </div>
        </div>
    );
};

Transcribe.propTypes = {
    trans: PropTypes.object,
    index: PropTypes.number,
    changeTranscribeData: PropTypes.func,
    updateTranscribeInput: PropTypes.func
};
