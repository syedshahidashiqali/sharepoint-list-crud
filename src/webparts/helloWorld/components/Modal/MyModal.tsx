import * as React from 'react';
import { useId } from '@fluentui/react-hooks';
import {
  Modal,
  IIconProps,
} from '@fluentui/react';
import { IconButton, DefaultButton } from '@fluentui/react/lib/Button';
import { MyForm } from '../MyForm/MyForm';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from "./MyModal.module.scss";
import { getSP } from '../../pnpjsConfig';

const cancelIcon: IIconProps = { iconName: 'Cancel' };

export interface IMyModalProps {
  id: number | undefined;
  context: WebPartContext;
  isModalOpen: boolean;
  isDelete: boolean;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: () => void;
  hideModal: () => void;
  getData: () => Promise<void>;
}

export const MyModal: React.FunctionComponent<IMyModalProps> = (props: IMyModalProps) => {
  const titleId = useId('title');

  const deleteHandler = async (id: number): Promise<void> => {
    const list = getSP(props.context).web.lists.getByTitle("ShahidList");
    await list.items.getById(id).delete();
  };
  return (
    <div>
      <Modal
        titleAriaId={titleId}
        isOpen={props.isModalOpen}
        onDismiss={props.hideModal}
        isBlocking={false}
        containerClassName={styles.modalContainer}
      >
        <div className={styles.header}>
          <h2 className={styles.heading} id={titleId}>
            <IconButton
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={() => {
                props.setIsDelete(false);
                props.hideModal();
              }}
              className={styles.closeIcon}
            />
            {props.id ? "Update Item" : props.isDelete == true ? "Delete Item" : "Create Item"}
          </h2>
        </div>
        <div className={styles.body}>
          {props.isDelete == false ? (
            <MyForm
              id={props.id}
              context={props.context}
              hideModal={props.hideModal}
              getData={props.getData}
              setIsDelete={props.setIsDelete}
            />
          ) : (
            <div>
              <h3>Are sure you want to delete?</h3>
              <DefaultButton
                style={{ marginRight: "20px" }}
                onClick={async () => {
                  console.log(71, props.id);
                  await deleteHandler(props.id);
                  props.hideModal();
                  props.setIsDelete(false);
                  props.getData().then(res => console.log("success")).catch(err => console.log("err"));
                }}
              >
                Yes
              </DefaultButton>
              <DefaultButton
                style={{ backgroundColor: "rgb(3, 120, 124)", color: "#fff" }}
                onClick={() => {
                  props.setIsDelete(false);
                  props.hideModal();
                }}
              >
                No
              </DefaultButton>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};


