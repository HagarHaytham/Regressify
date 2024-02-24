import React, {useState} from 'react'
import axios from 'axios'
import ScatterPlot from './ScatterPlot';

function UploadPlot() {
    const [problemName, setProblemName] = useState('')
    const [filename, setFilename] = useState('')
    const [file, setFile] = useState('')
    const [status, setStatus] = useState('')
    // const [imageData, setImageData] = useState(null);
    const [xData,setXData] = useState()
    const [yData,setYData]  = useState()   
    const [xLabel,setXLabel]= useState()
    const [yLabel,setYLabel]= useState()
    const [coeff ,setCoeff]= useState()
    const [intercept ,setIntercept]= useState()
    const [dataFetched,setDataFetched] = useState(false)
    let api = 'http://127.0.0.1:8000/uploadfile'

    // let api = 'https://regressify-api-0e7a76474e0a.herokuapp.com/uploadfile'

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set file data
        setFilename(event.target.files[0].name); // Set filename
      };
    
      const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
    
        if (!problemName || !file) {
          setStatus('Please enter a problem name and select a file to upload.');
          return; // Early exit if required fields are empty
        }
    
        console.log('Form submitted'); 
    
        const formData = new FormData();
        // formData.append('name', problemName);
        formData.append('csv', file, filename);

        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Content-Disposition': 'attachment; filename='+filename
            }
        }
    
        axios.post(api + '/files/', formData, axiosConfig)
          .then((response) => {
            // console.log(response)            
            setXData(response.data.x_data)
            setYData( response.data.y_data)
            setXLabel( response.data.x_label)
            setYLabel( response.data.y_label)
            setCoeff( response.data.coefficients)
            setIntercept( response.data.intercept)
            setStatus(response.data.message)
            setDataFetched(true)
            // setImageData(response.data.image_data);
          })
          .catch((error) => {
            console.error(error);
            setStatus('An error occurred during file upload.');
          });
      };
    

    return (
        <div className="container-fluid">
            <h1 className="text-center bg-primary text-white mt-2 p-3">Regressify : A Simple Linear Regression Tool </h1>
            <div className="row">
                <div >
                    <h2 className="alert alert-success">File Upload Section</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1" className="float-left">Problem Name</label>
                            <input type="text" onChange={e => setProblemName(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile" className="float-left">Browse A File To Upload</label>
                            <input type="file" accept=".csv" onChange={handleFileChange}
                             className="form-control" required />
                        </div>

                        <button type="submit" className="btn btn-primary float-left mt-2">Submit</button>
                        <br />
                        <br />
                        <br />
                        {status ? <h2>{status}</h2> : null}
                        {dataFetched && <ScatterPlot xData={xData} yData={yData} xLabel={xLabel} yLabel={yLabel} coeff={coeff} intercept={intercept} problemName={problemName}></ScatterPlot> }
                    </form>
                </div>
            </div>
        </div>

    )
}

export default UploadPlot