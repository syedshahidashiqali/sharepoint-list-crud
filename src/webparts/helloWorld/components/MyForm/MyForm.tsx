import *  as  React from 'react';
import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IAProps {
  context: WebPartContext;
  id?: number;
  hideModal: () => void;
  getData: () => Promise<void>;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyForm: React.FC<IAProps> = (props: IAProps): JSX.Element => {
  return (
    <>
      {props.id ? (
        <DynamicForm
          context={props.context}
          listId={"614b8ec9-d534-409a-a0e4-f7af2834d767"}
          listItemId={props.id}
          onCancelled={() => {
            console.log('Cancelled');
            props.setIsDelete(false);
            props.hideModal();
          }}
          onBeforeSubmit={async (listItem) => { return false; }}
          onSubmitError={(listItem, error) => { alert(error.message); }}
          onSubmitted={async (listItemData) => {
            console.log(listItemData);
            props.getData().then(res => console.log("success")).catch(err => console.log("err"));
            props.setIsDelete(false);
            props.hideModal();
          }}
        />
      ) : (
        <DynamicForm
          context={props.context}
          listId={"614b8ec9-d534-409a-a0e4-f7af2834d767"}
          onCancelled={() => {
            console.log('Cancelled');
            props.setIsDelete(false);
            props.hideModal();
          }}
          onBeforeSubmit={async (listItem) => { return false; }}
          onSubmitError={(listItem, error) => { alert(error.message); }}
          onSubmitted={async (listItemData) => {
            console.log(listItemData);
            props.getData().then(res => console.log("success")).catch(err => console.log("err"));
            props.setIsDelete(false);
            props.hideModal();
          }}
        />
      )}
    </>
  );
};