import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState, useEffect } from 'react';
import { getSP } from '../pnpjsConfig';

export const HelloWorld = (props: IHelloWorldProps): JSX.Element => {
  const {
    description,
    test,
    test1,
    test2,
    test3,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    siteName,
    context
  } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const listData = await getSP(context).web.lists.filter("Hidden eq false").select("Title", "ID")();
      console.log(38, listData);
      setData(listData);
    };
    getData().then(res => console.log("success")).catch(err => console.log("err"));

    // (async () => {
    //   const data = await listData;
    //   setData(data);
    // })();
  }, [data?.length]);

  return (
    <section className={`${styles.helloWorld} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
        <div>Web part property value Description: <strong>{escape(description)}</strong></div>
        <div>Web part property value Test: <strong>{escape(test)}</strong></div>
        <div>Web part property value Test1: <strong>{test1 == true ? "Checked" : "Unchecked"}</strong></div>
        <div>Web part property value Test2: <strong>{escape(test2)}</strong></div>
        <div>Web part property value Test3: <strong>{test3 == true ? "ON" : "OFF"}</strong></div>
      </div>
      <div>
        <h3>Welcome to SharePoint Framework!</h3>
        <div>context USER: <strong>{userDisplayName}</strong></div>
        <div>Loading from: <strong>{siteName}</strong></div>
      </div>
      <div>
        <h3>List Data</h3>
        {data?.map((item: any, index: number) => (
          <div key={index}>{item?.Title}</div>
        ))}
      </div>
    </section>
  );
};

export default HelloWorld;