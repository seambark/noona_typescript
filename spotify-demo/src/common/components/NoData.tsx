import React from 'react'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { styled } from '@mui/material';

interface NoDateProps {
    icoAddList?: boolean,
    iconNoData?: boolean,
    keyword?: string;
    text?: string;
}

// const handleIcon = (icon:string):SvgIconTypeMap<{}, "svg"> | undefined=> {
//     if(icon === "addData") return <PlaylistAddIcon />
//     if(icon === "noData") return <DoNotDisturbAltIcon />
// }
const NoDataContent = styled("div") ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    height: "75%",
    minHeight: "200px",
})
const IconBox = styled("div") ({
    "& svg" : {
        fontSize: "100px",
    }
})
const TxtBox = styled("div") ({

})

const NoData = ({icoAddList, iconNoData, keyword, text}:NoDateProps) => {
  return (
    <NoDataContent>
        <IconBox>
            {icoAddList &&  <PlaylistAddIcon/>}
            {iconNoData &&  <DoNotDisturbAltIcon/>}
        </IconBox>
        <TxtBox>
            {text ? (keyword ? 
            `"${keyword}" ${text}` 
            : text) : ""}
        </TxtBox>
    </NoDataContent>
  )
}

export default NoData