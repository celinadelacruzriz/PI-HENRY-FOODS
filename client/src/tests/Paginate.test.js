import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Paginate from "../components/Paginate";



configure({ adapter: new Adapter() });

describe("<Paginate /> Component Testing", () => {
      describe("Estructura", () => {
            let wrapper;
            beforeEach(() => {
                  wrapper = shallow(<Paginate />);
            });
            it("Renderiza un <nav> conlas paginas a navegar", () => {
                  expect(wrapper.find("nav")).toHaveLength(1);
            });

      });
})