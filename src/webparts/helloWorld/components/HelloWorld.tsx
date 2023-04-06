import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
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
      siteName
    } = this.props;

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
      </section>
    );
  }
}
