import * as React from 'react';
import { IHelloWorldProps } from './IHelloWorldProps';
import { useState, useEffect } from 'react';
import { getSP } from '../pnpjsConfig';
import { ListDetails } from './ListDetails/ListDetails';
import { MyModal } from './Modal/MyModal';

// Modal
import { useBoolean } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { FontIcon, IconButton } from 'office-ui-fabric-react';

export const HelloWorld = (props: IHelloWorldProps): JSX.Element => {
  const { context } = props;

  const [data, setData] = useState<any[]>([]);

  const [listViewData, setListViewData] = useState<any[]>([]);

  const [defaultId, setDefaultId] = useState<undefined | number>(undefined);
  // Modal
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const getData = async (): Promise<void> => {
    const listData = await getSP(context).web.lists.getByTitle("ShahidList").items.select("Title", "ID")();
    console.log(38, listData);
    setData(listData);
    const lists = listData.map(item => {
      return {
        Id: item.Id,
        Title: item.Title
      };
    });
    setListViewData(lists);
  };

  useEffect(() => {
    getData().then(res => console.log("success")).catch(err => console.log("err"));

    // (async () => {
    //   const data = await listData;
    //   setData(data);
    // })();
  }, [data?.length, listViewData.length]);

  return (
    <>
      <section>
        <DefaultButton onClick={() => {
          setDefaultId(undefined);
          showModal();
        }}>
          <span>New Item</span>
          <IconButton>
            <FontIcon iconName='EditMail' />
          </IconButton>
        </DefaultButton>
      </section>
      <section>
        <ListDetails
          items={listViewData}
          showModal={showModal}
          setDefaultId={setDefaultId}
          setIsDelete={setIsDelete}
        />
      </section>
      <section>
        <MyModal
          context={props.context}
          id={defaultId}
          isModalOpen={isModalOpen}
          hideModal={hideModal}
          showModal={showModal}
          getData={getData}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
        />
      </section>
    </>
  );
};

export default HelloWorld;