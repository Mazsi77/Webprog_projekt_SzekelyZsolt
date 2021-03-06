import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import { makeStyles } from '@mui/styles';
import { Card,CardHeader, CardContent, CardActions , Typography, Chip, Button } from '@mui/material';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api/models" 
});

function ModelCard ({modelId}) {  
    const [model, setModel] = useState(null);

    useEffect(() => {
        
        async function getModel() {
          const response = await client.get('/' + modelId);
          setModel(response.data);
        }
        getModel();
    }, []);

    async function deleteModel(){
        const response = await client.delete('/' + modelId, {data: {
            "api_token": "gMzQU88OAMuwVWFSk0BcyQ6uN4ZhNE"
          }});

    }

    if(!model) return <>No model</>;

    return (
        <Card sx={{ width: 350, minWidth: 300 }}>
            <CardHeader
                title={model['brand_name'] + " " + model['model_name']}
                subheader={"Model year: " + model['start_year'] + "-" + model['last_year']}
            />
            <CardContent>
                <div >
                    <p>Available fuel types:</p>
                    {model['fuel_types'].map((fuel) => {
                        return <Chip key={`fuel-${fuel['id']}`} label={fuel['name']} variant="outlined"/>
                    })}
                </div>
                <div >
                    <p>Available body types:</p>
                    {model['body_types'].map((fuel) => {
                        return <Chip key={`body-${fuel['id']}`} label={fuel['name']}/>
                    })}
                </div>
            </CardContent>
            <CardActions >
                <Button variant="outlined" color="error"  onClick={() => deleteModel()}>Delete</Button>
            </CardActions >
        </Card>
    )
}

export default ModelCard
