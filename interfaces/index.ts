// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

import {ThunkDispatch} from "redux-thunk";
import {IRootState} from "../store";
import {Action} from "redux";

export type MyThunkDispatch = ThunkDispatch<IRootState, unknown, Action>
