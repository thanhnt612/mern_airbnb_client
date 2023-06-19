import React, { ChangeEvent } from 'react'

export default function Perk({ selected, onChange }: any) {
    const handleChoose = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = event.target;
        if (checked) {
            onChange([...selected, name])
        } else {
            onChange([...selected.filter((selectedName: string) => selectedName !== name)])
        }
    }
    return (
        <>
            <p className='fw-bold mb-2'>Perks</p>
            <div className="d-flex flex-row flex-wrap">
                <label className='col-12 col-md-6 col-lg-3 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2' 
                    checked={selected.includes('wifi')} 
                    name='wifi' onChange={handleChoose} />
                    <i className="bi bi-wifi"></i> <span>Wifi</span>
                </label>
                <label className='col-12 col-md-6 col-lg-3 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2' 
                    checked={selected.includes('park')} 
                    name='park' onChange={handleChoose} />
                    <i className="bi bi-p-circle"></i> <span>Free parking spot</span>
                </label>
                <label className='col-12 col-md-6 col-lg-3 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2' 
                    checked={selected.includes('tv')} 
                    name='tv' onChange={handleChoose} />
                    <i className="bi bi-tv"></i> <span>TV</span>
                </label>
                <label className='col-12 col-md-6 col-lg-3 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2' 
                    checked={selected.includes('pet')} 
                    name='pet' onChange={handleChoose} />
                    <i className="bi bi-piggy-bank"></i> <span>Pets</span>
                </label>
                <label className='col-12 col-md-6 col-lg-3 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2' 
                    checked={selected.includes('entrance')} 
                    name='entrance' onChange={handleChoose} />
                    <i className="bi bi-signpost-split"></i> <span>Private entrance</span>
                </label>
            </div>
        </>
    )
}