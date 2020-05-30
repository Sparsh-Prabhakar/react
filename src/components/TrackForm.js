import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import LocationContext from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {

    const { state: { name, recording, locations }, startRecording, stopRecording, changeName } = useContext(LocationContext)
    const [saveTrack] = useSaveTrack()

    console.log(locations.length)
 
    return <>
        <Spacer>
            <Input onChangeText={changeName} placeholder="Enter name" />
        </Spacer>
        <Spacer>
            { recording
                ? <Button title='Stop' onPress={stopRecording} />
                : <Button title='Start Recording' onPress={startRecording} />
            }
        </Spacer>
        <Spacer>
            {
                !recording && locations.length 
                ? <Button title='Save Recording' onPress={saveTrack} />
                : null
            }
        </Spacer>      
    </>
}

export default TrackForm