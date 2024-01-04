import { Copy } from "lucide-react";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const CopySection = ({ roomId }) => {
  return (
    <div className="flex flex-col absolute text-white border border-white rounded p-2 left-[30px] bottom-[100px] bg-black">
      <div>Copy Room Id :</div>
      <hr className="my-1" />
      <div>
        <span className="flex items-center text-sm"> {roomId}</span>
        <CopyToClipboard text={roomId}>
          <Copy className="ml-3 cursor-pointer" />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopySection;
