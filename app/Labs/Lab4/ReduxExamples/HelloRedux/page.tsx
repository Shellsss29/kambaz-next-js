"use client";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";

export default function HelloRedux() {
  const { message } = useSelector((state: RootState) => state.helloReducer);

  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
    </div>
  );
}
