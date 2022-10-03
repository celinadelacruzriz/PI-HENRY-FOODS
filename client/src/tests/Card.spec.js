import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Card from "../components/Card";



configure({ adapter: new Adapter() });

describe("<Card /> Component Testing", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Card />);
    });
    it("Renderiza un <div> con toda la info que le llega por props", () => {
      expect(wrapper.find("div")).toHaveLength(1);
    });
    it("Renderiza un <h3>", () => {
      expect(wrapper.find("h3")).toHaveLength(1);
    });
    it("Renderiza un <img>", () => {
      expect(wrapper.find("img")).toHaveLength(1);
    });
    it("Renderiza tres <h5>", () => {
      expect(wrapper.find("h5")).toHaveLength(3);
    });
  });
});
