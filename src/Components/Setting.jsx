import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeature, featurePost } from '../actions/featureAction'
import { Input, Button, Tag, Spin, Alert } from 'antd'

export default function Setting() {
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector(state => state.feature)
    const [featureInput, setFeatureInput] = useState('')

    useEffect(() => {
        dispatch(getFeature())
    }, [dispatch])

    const handleInputChange = (e) => {
        setFeatureInput(e.target.value)
    }

    const handleAddFeature = () => {
        if (featureInput.trim()) {
            // Dispatch the action to add the feature
            dispatch(featurePost(featureInput))
            // Clear the input field after adding the feature
            setFeatureInput('')
        }
    }

    return (
        <div>
            <h2>Feature Adding</h2>

            {loading && <Spin size="large" />}
            {error && <Alert message="Error" description={error} type="error" showIcon />}

            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <Tag key={index} color="blue" style={{ marginBottom: '8px' }}>
                        {item.feature}
                    </Tag>
                ))
            ) : (
                <p>No features available.</p>
            )}

            <Input
                type="text"
                placeholder="Enter Feature"
                value={featureInput}
                onChange={handleInputChange}
                style={{ width: '200px', marginRight: '10px' }}
            />
            <Button type="primary" onClick={handleAddFeature}>
                Add Feature
            </Button>
        </div>
    )
}