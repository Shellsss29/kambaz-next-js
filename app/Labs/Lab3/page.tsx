import ArrayIndexAndLength from "./ArrayIndexAndength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import IfElse from "./IfElse";
import ImpliedReturn from "./ImpliedReturn";
import LegacyFunctions from "./LegacyFunctions";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TerenaryOerator";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import SimpleArrays from "./SimpleArrays";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import FindFunction from "./FindFunction";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FilterFunction from "./FilterFunction";
import FindIndex from "./FindIndex";
import JsonStringify from "./JsonStringify";
import House from "./House";
import Destructing from "./Destructing";
import Spreader from "./Spreader";
import FunctionDestructing from "./FunctionDesctucting";
import DestructingImports from "./DesctructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";

export default function Lab3() {
  console.log("Hello World!");
  return (
    <div>
      <h2>Lab 3</h2>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <Spreader />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione
        eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo
        excepturi consectetur. Modi omnis minus sequi maiores, provident
        voluptates.
      </Highlight>
      <PathParameters />
      <TodoItem />
      <TodoList />
    </div>
  );
}
