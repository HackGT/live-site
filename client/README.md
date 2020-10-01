# WebRTC Client SDK

![BlueJeans](./media/927.png)



Document Version: 1.3.1

Document Date: 2019-12-02

| Version | Date       | Who  | Description                                                  |
| ------- | ---------- | ---- | ------------------------------------------------------------ |
| 1.3.1   | 12/2/2019  | g1   | Update: remove optional requirement for Meeting Pool.  Make required that user's backend application schedules the meetings for the SDK to join.  Add note on disabling CORS for developers |
| 1.3.0   | 2/21/2019  | g1   | Update webrtc-sdk.js / webrtcsdk.min.js to support Chrome SDP change |
| 1.2.0   | 7/13/2018  | g1   | Add contentVideoEl as an initialization parameter, Expose Roster and events. |
| 1.1.0   | 3/26/2018  | g1   | Add ability to view Content Sharing                          |
| 1.0.2   | 10/23/2017 | g1   | add reference network requirements for WebRTC                |
| 1.0.1   | 10/13/2017 | g1   | Update webrtcclientsdk.js file to support firefox            |
| 1.0.0   | 10/12/2017 | g1   | Upgrade backend webrtc-sdk.js with Firefox                   |
|         |            |      | and patch for pre-call media request                         |
| 0.9.0   | 4/27/2017  | g1   | Initial Checkin of Client SDK doc                            |
| 0.9.1   | 5/2/2017   | g1   | Clean-up typos.  Add revs to S/W modules                     |
| 0.9.2   | 5/17/2017  | g1   | Update project with Corporate styling.  Adjust required build files |


<br />
<br />
<br />


<br />

# ![](./media/BlueJeans_Mark.png)  Introduction

Adding video calling ability to your own web page creates a connection between your business and your customers in a very personal way. The BlueJeans Web Real Time Communications (RTC) Client Software Development Kit (SDK) gives developers a quick and easy way to bring video-calling into a web page utilizing:

-   Simple Client Model for fast integration into your web site

-   Industry standard Web RTC Framework supported by many of the popularly available browsers like Google Chrome, Mozilla Firefox, and others.

-   Video connectivity over the internet using BlueJean Networks quality global video offering.

The WebRTC Client SDK enables application programmers to create rich video calls ***without*** the need to know great details behind video technology. You can focus on your business application needs and let BlueJeans take care of the video calling.
<br />
<br />
<br />
## Requirements

The requirements to create applications embedded with BlueJeans Web RTC SDK are listed below. The technology requirements are:

| Technology Requirement   | Condition             | Minimum                 |
| ------------------------ | --------------------- | ----------------------- |
| **Browser Support**      | Google Chrome         | Ver. 58.0.3029 or later |
|                          | Firefox               | Ver. 50 or later        |
|                          | Safari                | (pending)               |
| **Code Development**     | Javascript, HTML, CSS |                         |
| **Installed Frameworks** | JQuery                | ver 1.82 or later       |
|                          | Require JS            | ver 2.11 or later       |
<br />
<br />

WebRTC has requirements on network configuration regarding TCP/UDP ports and host access.  For specific information refer to the [BlueJeans WebRTC Support Page](https://support.bluejeans.com/knowledge/tcp-udp-ports)

<br />
<br />

Additionally, these business conditions must be in place in order for your customers to make BlueJeans video calls from your web page: 

| Business Requirement     | Condition | Description                              |
| ------------------------ | --------- | ---------------------------------------- |
| Domain whitelisting      | Req'd     | BlueJeans must add your hosting website to its domain whitelist for WebRTC calls.  The standard for Web Security (CORS) requires this whitelisting.  Contact [BlueJeans support](mailto:Support@bluejeans.com) when ready to be added to the whitelist. |
| Meetings API Scheduling   | Req'd | Hosting web site (API's) or BlueJeans.com (User Portal) must schedule the BlueJeans Meetings. |
<br />
<br />
<br />
<br />
<br />

# ![](./media/BlueJeans_Mark.png)  What Is Included in this SDK

BlueJeans provides this Software Development Kit with the following code and related files:

| File                    | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| **webrtcclientsdk.js**  | Javascript file containing the client application code for making video calls using BlueJeans’ RTCManager object. |
| **webrtcroster.js**     | Javascript file containing code to expose the BlueJeans Roster functionality. |
| **webrtcsdk.min.js**    | Javascript file containing the RTCManager object that interconnects Web RTC Standard protocols with BlueJeans’ video services infrastructure. |
| **example.js**          | Example Javascript file showing a typical process for loading and initializing a web page for BlueJeans RTC video communications |
| **Index.html**          | Example HTML file showing the typical layout and script initialization process for including BlueJeans RTC video features |
| **Require-config.js**   | Initial RequireJS boot-loader file for BlueJeans Web RTC     |
| **defaultRTCParams.js** | Default configuration parameters for RTC session             |
| **bjn-global.js**       | RequireJS-compliant abstraction for RTC object               |
<br />
<br />
<br />

## Development Environment

The BlueJeans WebRTC Client SDK is built using the *RequireJS*, open source framework. This framework helps to manage Javascript object dependency injection and create an orderly application boot-process.

BlueJeans *recommends* creating a folder structure on your web host similar to what is shown here. This will simplify loading and initializing your web page with WebRTC

![Project Structure](media/files.png)
<br />
### Working Around Whitelisting When Developing
Your developers can test their changes from a non-whitelisted host by using *browser extensions* that *disable the CORS requirement* in their browser.  Then, when ready to deploy, the host web server will need to be whitelisted at BlueJeans.

<br />
<br />
<br />

# ![](./media/BlueJeans_Mark.png) SDK Architecture

The BlueJeans WebRTC Client SDK models a simple video calling process. There are *five* logical components to a BlueJeans video session.

![SDK Functional Diagram](./media/blockdiagram.png)

The SDK surface contains software API’s that a customer web page calls to initiate and join a BlueJeans video meeting. It also provides methods to manage the meeting, the participants connecting to a meeting, and lastly the devices that a user’s browser connects to the meeting. The SDK Events provide asynchronous Javascript callbacks for conveying real time video-related event information back to your application.

| Video Meeting Component | General Functional Description           |
| ----------------------- | ---------------------------------------- |
| **Meeting**             | The Meeting Model represents that actual video session where a user is communicating over video with other(s). |
| **Participants**        | The Participant Model describes the nature of a user’s connection to a BlueJeans video call. It allows customer applications to modify attendance and attributes of connected user(s). |
| **Media Devices**       | The Media Devices component represents the media devices on the User’s PC that will be used to join into a BlueJeans video call. |
| **Administrative**      | The Administrative Model represents the general overhead of a BlueJeans WebRTC session. |
| **Events**              | The Events Model allows real time BlueJeans video events to notify customer applications in a timely manner. These callbacks are implemented as Javascript function calls. |
<br />
<br />
<br />
<br />
<br />

------

------


# ![](./media/BlueJeans_Mark.png) SDK: The BlueJeans RTCClient Object

The BlueJeans RTC Client SDK object is a Javascript software object model for using BlueJeans video calling. It presents simple set of API’s for video calls that you can integrate into your web page. It includes Javascript function-callbacks in response to real time state changes associated with the video call, and or changes in device conditions.

Because the BlueJeans RTC Client SDK deals with real time transactions, developers should bear in mind these conditions:

-   API calls may have deferred responses due to the real time nature of video call events and messages
-   Developer familiarity with Javascript Promise functionality is required.
-   Nested calls to API’s may require the use of Javascript promises in order to maintain consistency.

<br />
<br />
<br />

------

##  **Administrative API’s**
<br />
<br />

### ![](./media/api.png) **Initialize()** – Initialize RTC client environment

This API initializes the WebRTC client environment in preparation for making video calls over the BlueJeans network. It links the video media into the HTML DOM, establishes the limit on network bandwidth allocated for the video media, defines the media devices accessible to the client browser session, and provides callback event handlers.

Initialize() should be the very first action that you perform in preparation to make Video calls.

**Call by:**

`RTCClient.initialize( { initializationParameters } );`

**Parameters:**

*initializationParameters i*s a JSON object containing RTCManager configuration initialization values.

The *av\_devices* object contains the available sound and video devices for the client session. This list is retrieved using BlueJeans webrtcsdk function call, RTCManager.getLocalDevices(); Refer to the RTCManager SDK documentation for more information.

```Javascript
initializationParameters : {
   localVideoEl  : <dom element for rendering local video>,
   remoteVideoEl : <dom element for rendering remote video>,
   contentVideoEl: <dom element for rendering content share video>,
   bandWidth     : <100..4096>, <in Kbps max allocated netwk b/w?>
   devices       : { *av_devices* }, <Media devices on users PC>
   evtVideoUnmute                 : <function>, <callback or null>
   evtRemoteConnectionStateChange : <function>, <callback or null>
   evtLocalConnectionStateChange  : <function>, <callback or null>
   evtOnError                     : <function>, <callback or null>
   evtOnContentShareStateChange	  : <function>, <callback or null>
}
```


**Returns:**

none
<br />
<br />
<br />

### ![](./media/api.png)**setVideoBandwidth()** – Set the network limit for video bit-rate 

The setVideoBandwith() API configures the RTC Client with the maximum network video bitrate for subsequent calls. Note that the settings do not affect a call that is in-progress.

**Call By:**

`RTCClient.setVideoBandwidth( bitRate );`

**Parameters:**

The bitrate parameter specified, in Kilobits Per Second, the maximum video data rate to be sent over the network. The permissible range of bit rate is *100* to *4096*.

**Returns:**

None
<br />
<br />
<br />
<br />



### ![](./media/api.png)**version()** – Retrieve the version of the WebRTC SDK

### 

The version() API returns the version number of the WebRTC SDK. 

**Call By:**

`RTCClient.version();`

**Parameters:**

None.

**Returns:**

The version API returns the following JSON structure 

```javascript
{
    major : <an integer representing major revision level>,
    minor : <an integer representing minor revision level>, 
    build : <an integer representing incremental build of current revision(s)> 
}
```

<br />
<br />
<br />
<br />

------

## **Device API’s**
<br />
<br />

### **![](./media/api.png) changeAudioInput()** – Select microphone-input to use

The changeAudioInput() API configures the WebRTC Client SDK to use the audio from the specified Audio input device. This API affects calls in-progress.

**Call By:**

`RTCClient.changeAudioInput( selector )`

**Parameters:**

The *selector* parameter is the integer index into the audioIn array element on the Device object that was specified in the WebRTC Initialize() API call.

**Returns:**

None
<br />
<br />
<br />

### **![](./media/api.png) changeAudioOutput()** – Select speaker-device for use

The changeAudioOutput () API configures the WebRTC Client SDK to send audio to the specified Audio output device. This API affects calls in-progress.

**Call By:**

`RTCClient.changeAudioOutput( selector )`

**Parameters:**

The *selector* parameter is the integer index into the audioOut array element on the Device object that was specified in the WebRTC Initialize() API call.

**Returns:**

None
<br />
<br />
<br />

### **![](./media/api.png) changeVideoInput()** – Select camera-device for use

The changeVideoInput () API configures the WebRTC Client SDK to use the video from the specified video input device. This API affects calls in-progress.

**Call By:**

`RTCClient.changeVideoInput ( selector )`

**Parameters:**

The *selector* parameter is the integer index into the videoIn array element of the Device object that was specified in the WebRTC Initialize() API call.

**Returns:**

None
<br />
<br />
<br />
<br />

------

## **Meeting API’s**

<br />
<br />

### ![](./media/api.png) **joinMeeting()** – Join/start BlueJeans meeting

The joinMeeting() API function connects the web client into the specified BlueJeans video meeting using *optionally* provided passcode. If the meeting was scheduled requiring a host code to start, joinMeeting() can start the meeting if the passcode contains the host code.

This will initiate the video being rendered on the client HTML page via WebRTC.

**Call by:**

`RTCClient.joinMeeting(meetingParams)`

**Parameters:**

meetingParams is a JSON object that contains information related to the meeting to be started as well as this client’s participation access.

```Javascript
meetingParams : {
    numericMeetingId : ‘string’, meeting id,
    attendeePasscode : ‘string’, optional: include only if meeting requires passcode
    displayName      : ‘string’  Name of user as displayed in roster
}
```

**Returns:**

None
<br />
<br />
<br />

### ![](./media/api.png) **leaveMeeting()** – Exit the Video session

The leaveMeeting() API function instructs RTCManager to disconnect the video streams, and exit the BlueJeans video call.

**Call By:**

`RTCClient.leaveMeeting()`

**Parameters:**

None

**Returns:**

None
<br />
<br />
<br />
<br />
<br />

------

## **Participation API’s**
<br />
<br />

### ![](./media/api.png) **toggleVideoMute()** – Change client’s Video Mute state

The toggleVideoMute() API call instructs the WebRTC Client SDK to mute or unmute the client’s video feed to the BJN call. If the local video was active, toggleVideoMute() will turn off the local video, and vice versa.

**Call By:**

`muteState = RTCClient.toggleVideoMute();`

**Parameters**

None.

**Returns:**

The API returns the expected new state for video media: *true* if video is muted, *false* if video is live.
<br />
<br />
<br />

### ![](./media/api.png) **toggleAudioMute()** – Change client’s Audio Mute state

The toggleAudioMute() API call instructs the WebRTC SDK to mute or unmute the client’s microphone feed to the BJN call. If the local microphone was active, toggleAudioMute () will turn off the local microphone’s audio, and vice versa.

**Call By:**

`muteState = RTCClient.toggleAudioMute();`

**Parameters**

None.

**Returns:**

The API returns the expected new state for audio media: *true* if audio is muted, *false* if audio is live.
<br />
<br />
<br />
<br />
<br />

## ![](./media/BlueJeans_Mark.png) **WebRTC Client SDK event callbacks**

Partner web app can listen to the RTCClient event handles and take appropriate actions on the callbacks.

<u>List of events</u>

| Event                                   | Description                                                  |
| --------------------------------------- | ------------------------------------------------------------ |
| `evtVideoUnmute()`                      | This event is triggered when the client’s local video is unmuted and the media stream is being reestablished. |
| `evtRemoteConnectionStateChange(state)` | This event is triggered when the remote video connection changes state. The event callback returns the WebRTC-specific state condition. |
| `evtLocalConnectionStateChange(state)`  | This event is triggered when the local video connection changes state. The event callback returns the WebRTC-specific state condition. |
| `evtOnError(what)`                      | This event triggers when the BlueJeans RTCManager object encounters a low-level RTC error. The callback returns a BlueJeans’ descriptor indicating the problem-area. |
| `evtContentShareStateChange(state)`     | This event triggers when the BlueJeans meeting in the cloud begins or ends sharing content to participants.  The state variable is a boolean where  **true** indicates content is being shared into the meeting. |



------



# ![](./media/BlueJeans_Mark.png) SDK: The BlueJeans RTCRoster Object

A feature of BlueJeans video meetings is the ability to see the list of participants attending the meeting as well as their conditions.  The collective display of participants is called the Rosterf.   Utilizing the RTCRoster object, developers now have a broad range of functionality available:

- Access Participant Information
- Trigger on Events related to changes in Participant conditions



## **Roster Participant Object**

The RTCRoster object represents the collection of meeting participants.  Each attendee is accessible through a set of attributes.   The roster is built using the Backbone framework, and so member attributes are accessed syntactically by:

`variable.attributes.attributeName`

So for example, if the variable **person** has an attribute called ***height***, then you would programmatically access that attribute by:

`person.attributes.height`

The list of BlueJeans roster participant attributes are described below:

```assembly
Participant: {
      chatEndpointGuid        : Unique Identifier of chat session
      callguid 			     : Unique Identifier of Call session
      id                      : Unique Identifier in Participant list
      name                    : Participant's name'
      type                    : Type of endpoint device
      callQuality             : Integer[0..5] indicating ongoing call quality
      isLeader                : This participant is the meeting leader.
      isSelf                  : This participant object represents current session
      endpointType            : Type of endpoint device.
      isSpeaking              : The participant is speaking into meeting
      isPresenting            : The participant is sharing into meeting
      isSecure                : Participant connection is via secure link.
      isPhone                 : Participant is connected using telephone 
      meetingId               : Global Unique ID of meeting 
      isVisible               : Participant is visible
      isChatOnly              : Participant has joined only in Chat session
      inWaitingRoom           : Participant is waiting to enter meeting
      isPresentationLayout    : Participant display set to Presentation Layout
      isVideoLayout           : Participant display set to video
      currentLayout           : Current video layout of Participant display

      isCurrentlyShowingVideo : Participant is displaying the Meeting Video
      isSendingVideo          : Participant is sending their WebCam Video
      isServerMutingVideo     : Participant has been muted from BlueJeans Cloud
      isVideoSeen             : Participant's video is being seen

      isCurrentlyShowingAudio : Participant is hearing audio from the Meeting
      isSendingAudio          : Participant is sending the microphone audio
      isServerMutingAudio     : Participant ha been muted from the BlueJeans Cloud
      isAudioHeard            : Participant's audio is being heard
      alerts                  : TBD
      audioRecvCodec          : Name of the Codec receiving audio from Cloud
      audioSendCodec          : Name of the Codec sending audio to Cloud
      videoRecvCodec          : Name of the Code receiving video from Cloud
      videoRecvHeight         : Height of the Received Video
      videoRecvWidth          : Width of the Received Video.
      videoSendCodec          : Name of the Codec sending video to the Cloud
      videoSendHeight         : Height of the video being sent
      videoSendWidth          : Width of the video being sent
      contentRecvHeight       : Height of the content share video from Cloud
      contentRecvWidth        : Width of the content share video from Cloud
      videoShareRecvHeight    : Height of conent share video from Cloud
      videoShareRecvWidth     : Width of conent share video from Cloud
      pinnedGuid              : TBD
      connections             : JSON Object describing Participant's connection data
      rdcControllee           : Which participant remote desktop is being controlled
      rdcVersion              : What version of Remote Desktop Control is in use
      isRdcControllerCapable  : Participant is able to control another desktop.
      isRdcControlleeCapable  : Participant's desktop may be remotely controlled.
}
```



## **Roster Event Callbacks**

The RTCRoster object can be setup to asynchronously trigger a callback upon predetermined conditions of the roster or a participant.   Your application code should implement a callback function with this format:

```javascript
myCallBackHandler( party, Collection, Options ) {
}
```

parameters passed to your callback are defined as:

*party*  :  The specific Roster Participant object that triggered the callback

*Collection* : The backbone collection from where the trigger participant object is a member

*Options* :  refer to the Backbone JS specification





## **Roster API’s**

<br />
<br />

### ![](C:/Users/glenn/Documents/GitHub/sdk-webrtc-meetings/media/api.png) **Initialize()** – Initialize RTC roster environment

This API initializes the BlueJeans Roster package in preparation for displaying and responding to changes in a Meeting Roster. 

Initialize() should be the very first action that you perform in preparation to make Video calls.

**Call by:**

`RTCClient.initialize( initializationParameters );`

**Parameters:**

*initializationParameters i*s a JSON object containing RTCManager configuration initialization values.

```javascript
initializationParameters : {
   }
```

**Returns:**

none
<br />
<br />
<br />

<hl>

### ![](./media/api.png) getPartyCount() – Retrieve Count of Roster Participants

This API queries the BlueJeans Roster package for the total number of *Participants* in the meeting.

**Call by:**

`RTCClient.getPartyCount( );`

**Parameters:**

  none

**Returns:**

The getPartyCount() API returns:

​    current number of participant ins meeting

<br />
<br />
<br />

<hl>

### ![](./media/api.png) getParticipant(nParty) – Retrieve Participant from Roster 

This API queries the BlueJeans Roster package for the *Participant* information for the specified party. Initialize() should be the very first action that you perform in preparation to make Video calls.

**Call by:**

`RTCClient.getParticipant( nParty );`

**Parameters:**

*nParty*  a 0-based integer corresponding to the Participant information in the array of meeting participants.

**Returns:**

The getParticipant() API returns:

  Success: Participant JSON structure 

  Error:  null

<br />
<br />

### ![](./media/api.png) isMe( aParticipant ) – Is this Participant Me?

This API tests the specified Participant object to see if it corresponds to the session associated with this roster API query.

**Call by:**

`RTCClient.isMe( aParticipant );`

**Parameters:**

  *aParticipant*  a Participant JSON object to be tested

**Returns:**

The isMe() API returns:

​    true: the specified participant is the query session participant.

   false: the specified participant is another participant

<br />



### ![](./media/api.png) onChange( isOn,attr,cb ) – Notify Me when A Participant's Attribute Changes?

This API sets or clears the asynchronous triggering of callbacks when changes have been made to the specified attribute.  

**Call by:**

`RTCClient.onChange( isOn, "fieldName", myCallBack );`

**Parameters:**

  *isOn* :  a Boolean control value where:

​	true : Enable triggering on a change to specified Participant attribute

​	false:  stop triggering on changes to the specified Participant attribute.

  "*fieldName*" : a string that corresponds to any of the Patticipant property names.

   *myCallBack* : your application's callback handler function.



**Returns:**

  none

<br />



### ![](./media/api.png)onJoin( isOn,cb ) – Notify Me when A Participant Joins

This API sets or clears the asynchronous triggering of callbacks when someone joins the BlueJeans meeting. 

**Call by:**

`RTCClient.onJoin( isOn, myCallBack );`

**Parameters:**

  *isOn* :  a Boolean control value where:

​	true : Enable triggering on a Participant joining the meeting

​	false:  stop triggering on Participant's joining the meeting.

   *myCallBack* : your application's callback handler function.



**Returns:**

  none

<br />



### ![](./media/api.png)onLeave ( isOn,cb ) – Notify Me when A Participant Leaves

This API sets or clears the asynchronous triggering of callbacks when someone leaves the BlueJeans meeting. 

**Call by:**

`RTCClient.onLeave( isOn, myCallBack );`

**Parameters:**

  *isOn* :  a Boolean control value where:

​	true : Enable triggering on a Participant leaving the meeting

​	false:  stop triggering on Participant's leaving the meeting.

   *myCallBack* : your application's callback handler function.



**Returns:**

  none

<br />



### ![](C:/Users/glenn/Documents/GitHub/sdk-webrtc-meetings/media/api.png)close( ) -- End Roster Session

This API sets indicates the end of a session monitoring the BlueJeans Roster.  It performs cleanup of internal states and variables.

**Call by:**

`RTCClient.close();`

**Parameters:**

  none



**Returns:**

  none

<br />

