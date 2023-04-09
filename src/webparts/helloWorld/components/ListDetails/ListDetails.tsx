import * as React from "react";
import {
  ListView,
  SelectionMode,
} from "@pnp/spfx-controls-react/lib/ListView";
import { IColumn, Icon, IconButton } from "office-ui-fabric-react";

export interface IListDetailsProps {
  items: any[],
  setDefaultId: React.Dispatch<React.SetStateAction<number>>;
  showModal: () => void;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListDetails: React.FunctionComponent<IListDetailsProps> = (props: IListDetailsProps): JSX.Element => {

  const getSelection = (items: any[]): void => {
    console.log('Selected items:', items);
  };

  const columns = [
    {
      name: "edit",
      displayName: "Edit",
      render: (item: any, index: number, column: IColumn) => {
        return (
          <IconButton
            onClick={() => {
              props.setDefaultId(item.Id);
              props.showModal();
            }}
          >
            <Icon iconName="EditMail" />
          </IconButton>);
      },
      isResizable: true,
      maxWidth: 40
    },
    {
      name: "delete",
      displayName: "Delete",
      render: (item: any, index: number, column: IColumn) => {
        return (
          <IconButton
            onClick={() => {
              props.setIsDelete(true);
              props.setDefaultId(item.Id);
              props.showModal();
            }}
          >
            <Icon iconName="Delete" />
          </IconButton>
        );
      },
      isResizable: true,
      maxWidth: 50
    },
    { name: "Id", displayName: "ID", maxWidth: 40, isResizable: true },
    { name: "Title", displayName: "Title", isResizable: true }
  ];

  return (
    <>
      <h2>My List View Component</h2>
      <ListView
        items={props?.items}
        viewFields={columns}
        compact={true}
        selectionMode={SelectionMode.single}
        selection={getSelection}
        showFilter={true}
        defaultFilter=""
        filterPlaceHolder="Search..."
        stickyHeader={true}
      />
    </>
  );
};