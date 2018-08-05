import { Indexable } from "./Indexable";
import { SemanticCOLORS } from "../../node_modules/semantic-ui-react";

export type Category = Indexable & {
    notes: string[];
    color: SemanticCOLORS;
}
