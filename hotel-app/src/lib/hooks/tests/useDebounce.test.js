import React from "react";
import {render, screen, act, cleanup} from "@testing-library/react";
import useDebounce from "../useDebounce";

describe("Test useDebounce hook", () => {
  const HookComponent = (props) => {
    const value = useDebounce(props.value, props.delay);
    return <div>{value}</div>;
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.useRealTimers();
  });

  test("Assert Basic rendering", async () => {
    const {rerender} = render(<HookComponent value="test0" delay={100}/>);

    // assert initial value
    screen.getByText("test0");

    // rerender is used to mock that new value is received
    rerender(<HookComponent value="test1" delay={500} />);
    expect(screen.queryByText("test1")).toBe(null);

    // after 400ms the text is still null
    act(() => jest.advanceTimersByTime(400));
    expect(screen.queryByText("test1")).toBe(null);
  });
});
