import React, {useState,useEffect} from 'react'
import axios from 'axios'


function UploadFile() {
    const [problemName, setProblemName] = useState('')
    const [filename, setFilename] = useState('')
    const [file, setFile] = useState('')
    const [status, setstatus] = useState('')
    const [imageData, setImageData] = useState(null);

    let api = 'http://127.0.0.1:8000/uploadfile'

     
    const saveFile = () =>{
        console.log('Button clicked')

        let formData = new FormData();
        // formData.append("name",problemName)
        console.log(filename)
        formData.append("csv",file, filename)

        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Content-Disposition': 'attachment; filename='+filename
            }
        }
        console.log(formData.get('csv')); 
        console.log(formData)
        axios.post(api + '/files/', formData, axiosConfig).then(
            response =>{
                console.log(response.data)
                setstatus(response.data.message)
                setImageData(response.data.image_data)
            }
        ).catch(error =>{
            console.log(error)
        })
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center bg-primary text-white mt-2 p-3">Regressify : A Simple Linear Regression Tool </h1>
            <div className="row">
                <div className="col-md-4">
                    <h2 className="alert alert-success">File Upload Section</h2>
                    <form >
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1" className="float-left">Problem Name</label>
                            <input type="text" onChange={e => setProblemName(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1" className="float-left">Browse A File To Upload</label>
                            <input type="file" accept=".csv" onChange={e =>{
                                setFile(e.target.files[0]); // Set file data
                                setFilename(e.target.files[0].name); // Set filename
                                }} className="form-control" />
                        </div>

                        <button type="button" onClick={saveFile} className="btn btn-primary float-left mt-2">Submit</button>
                        <br />
                        <br />
                        <br />
                        {status ? <h2>{status}</h2> : null}
                        <div>
                            {imageData ? (
                                <img src={`data:image/png;base64,${imageData}`} alt="Scatter Plot" />
                            ) : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default UploadFile