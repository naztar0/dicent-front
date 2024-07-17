import {DefaultAvatar} from "@/components/Misc/Icons";
import {colorChar} from "@/context/utils";

export const Avatar = ({
                           avatar,
                           size,
                           username = null,
                           padding = size / 2.8,
                           rounded = true,
                           units = "px",
                           align = "center"
                       }) => {
    let style = {};
    if (size)
        style = {...style, height: `${size}${units}`, width: `${size}${units}`, alignSelf: align};
    if (rounded)
        style = {...style, borderRadius: "999px"};
    if (avatar)
        return <img src={`${import.meta.env.VITE_BACK_URL}/storage/images/${avatar}`} alt="avatar" style={style}/>;
    if (username) {
        let lt = username[0];
        lt.codePointAt(0) >= 0xD800 ? lt += username[1] : lt = lt.toUpperCase();
        return (<div style={{
            ...style, textAlign: "center", paddingTop: `${padding}${units}`, backgroundColor: colorChar(username)
        }}>
            <span style={{fontSize: `${size * 2 / 3}${units}`}} className="avatar-username">{lt}</span>
        </div>);
    }
    return <DefaultAvatar style={style} alt="avatar"/>;
}
