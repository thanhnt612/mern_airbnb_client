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
            <p className='fw-bold mb-2'>⚙️Perks</p>
            <div className="check-item d-flex flex-row flex-wrap">
                <label className='col-6 col-md-3 col-lg-2 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2'
                        checked={selected.includes('wifi')}
                        name='wifi' onChange={handleChoose} />
                    <i className="text-primary bi bi-wifi"></i> <span>Wifi</span>
                </label>
                <label className='col-6 col-md-3 col-lg-2 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2'
                        checked={selected.includes('park')}
                        name='park' onChange={handleChoose} />
                    🚘 <span>Parking</span>
                </label>
                <label className='col-6 col-md-3 col-lg-2 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2'
                        checked={selected.includes('tv')}
                        name='tv' onChange={handleChoose} />
                    📺 <span>TV</span>
                </label>
                <label className='col-6 col-md-3 col-lg-2 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2'
                        checked={selected.includes('pet')}
                        name='pet' onChange={handleChoose} />
                    🐶 <span>Pets</span>
                </label>
                <label className='col-6 col-md-3 col-lg-2 border p-3 bg-white rounded' style={{ cursor: 'pointer' }}>
                    <input type="checkbox" className='me-2'
                        checked={selected.includes('entrance')}
                        name='entrance' onChange={handleChoose} />
                    🚪 <span>Entry</span>
                </label>
            </div>
        </>
    )
}