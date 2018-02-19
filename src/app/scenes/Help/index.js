import React, { Component } from 'react';

import Heading from '../../components/Heading';
import LinkRef from '../../components/LinkRef';
import Text from '../../components/Text';
import Image from '../../components/Image';
import Post from '../../components/Post';
import Border from '../../components/Border';

export default class Help extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        maxWidth: 900,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      post: {
        margin: 5,
        marginTop: 10,
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
      },
      row: {
        display: 'flex',
        flexDirection: 'row'
      }
    }
  }

  render() {
    return (
      <div className="animated fadeIn" style={{...this.styles.container}}>
        <div style={{...this.styles.post, padding: 5}}>
          <Heading title="So you wanna master the command line..."/>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: 20}}>
              <Text style={{marginTop: 20}} text="The command line syntax is as such: "/>
              <Text style={{color: 'blue', fontWeight: 'bold', marginTop: 10}} text="<command> <direction> <extra>"/>
            </div>
            <Border />
            <Post>
              <Heading style={{marginBottom: 10, marginTop: 10}} subHeadingStyle={{fontSize: 30}} subtitle="navigate" />
              <Text style={{fontWeight: 'bold'}}>"command"</Text>
                <div style={{padding: 10}}>
                  <Text>Used to navigate around the app. Even this page!</Text>
                  <Text>Using the menu icons has the same effect.</Text>
                </div>
              <Text style={{fontWeight: 'bold'}}>"direction"</Text>
                <div style={{padding: 10}}>
                  <Text>home - navigates to the home page.</Text>
                  <Text>about - navigates to the about page.</Text>
                  <Text>projects - navigates to the projects page.</Text>
                  <Text>guides - navigates to the guides page.</Text>
                  <Text>contact - navigates to the contact page.</Text>
                  <Text>settings - navigates to the settings page.</Text>
                  <Text>help - navigates to this page!</Text>
                </div>
              <Text style={{fontWeight: 'bold'}}>"extra"</Text>
                <div style={{padding: 10}}>
                  <Text>"navigate guides (number)"</Text>
                  <Text>A whole number in the range from 0 to total length of all guides in store.</Text>
                </div>
            </Post>
            <Border />
            <Post>
              <Heading style={{marginBottom: 10, marginTop: 10}} subHeadingStyle={{fontSize: 30}} subtitle="goto" />
              <Text style={{fontWeight: 'bold'}}>"command"</Text>
                <div style={{padding: 10}}>
                  <Text>Used to direct the user to different related sites of mine!</Text>
                  <Text>Each 'goto' will open in a seperate tab.</Text>
                  <Text>Using the footer icons at the bottom of the screen has the same effect.</Text>
                </div>
              <Text style={{fontWeight: 'bold'}}>"direction"</Text>
                <div style={{padding: 10}}>
                  <Text>stack - navigates my stack overflow page.</Text>
                  <Text>github - navigates my github page.</Text>
                  <Text>freecodecamp - navigates to my Free Code Camp page.</Text>
                  <Text>linkedin - navigates to my linkedin page.</Text>
                  <Text>quora - navigates to my quora page.</Text>
                  <Text>youtube - navigates my youtube channel.</Text>
                </div>
              <Text style={{fontWeight: 'bold'}}>"extra"</Text>
                <div style={{padding: 10}}>
                  <Text>Nothing... YET! :)</Text>
                </div>
            </Post>
            <Border />
            <Post>
              <Heading style={{marginBottom: 10, marginTop: 10}} subHeadingStyle={{fontSize: 30}} subtitle="search" />
              <Text style={{fontWeight: 'bold'}}>"command"</Text>
                <div style={{padding: 10}}>
                  <Text>Used to query and search for different items in this blog!</Text>
                </div>
              <Text style={{fontWeight: 'bold'}}>"direction"</Text>
                <div style={{padding: 10}}>
                  <Text>guides - searches for guides.</Text>
                </div>
              <Text style={{fontWeight: 'bold'}}>"extra"</Text>
                <div style={{padding: 10}}>
                  <Text>"search guides (query string)"</Text>
                  <Text>"query string" - A string representing what will be searched.</Text>
                  <Text>For example, if the direction is "guides", the query will search for a guide that has a match in the heading or subheading.</Text>
                </div>
            </Post>
            <Border />
        </div>
      </div>
    );
  }






























}
