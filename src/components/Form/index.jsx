import React, { Fragment, useState } from "react";
import axios from 'axios';

export default function Form() {
  const [formData, setFormData] = useState({
    key: '',
    iv: '',
    password: ''
  });

  const [mode, setMode] = useState(0)

  const [result, setResult] = useState({ result: '' });

  const { key, iv, password } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = async e => {
    e.preventDefault();
    const newRequest = {
      key, iv, password
    }
    let api_url = "c";
    console.log(mode)
    if (mode === 1){
      api_url = "/encrypt";
    } else {
      api_url = "/decrypt";
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify(newRequest);
      const res = await axios.post(api_url, body, config);
      setResult(res);
    } catch(err) {
      console.log(err.response.data);
    }
	}

	return (
		<Fragment>
			<form onSubmit={e => onSubmit(e)}>
				<div className="container mt-3">
					<div className="form-group row">
						<label className="col-sm-3 col-form-label" htmlFor="">Key</label>
						<div className="col-sm-9">
							<input className="form-control" name="key" type="text" value={key} onChange={e => onChange(e)} required/>
						</div>
					</div>

					<div className="form-group row">
						<label className="col-sm-3 col-form-label" htmlFor="">IV</label>
						<div className="col-sm-9">
							<input className="form-control" name="iv" placeholder="00000000" type="text" value={iv} onChange={e => onChange(e)}/>
						</div>
					</div>

					<div className="form-group row">
						<label htmlFor="exampleTextareaBio" className="col-sm-3 col-form-label">Content</label>
						<div className="col-sm-9">
							<textarea className="form-control" name="password" id="exampleTextareaBio" rows="2" value={password} onChange={e => onChange(e)} required></textarea>
						</div>
					</div>

					<div className="form-group row">
						<div className="col-sm-9 offset-sm-3">
							<button onClick={e => setMode(1)} type="submit" className="btn btn-primary">Encrypt?</button>
              <button onClick={e => setMode(0)} type="submit" className="btn btn-primary ml-3">Decrypt?</button>
						</div>
					</div>

					<div className="form-group row">
						<label htmlFor="exampleTextareaBio" className="col-sm-3 col-form-label">Result</label>
						<div className="col-sm-9">
							<textarea value={result.data} className="form-control" id="result" rows="2" placeholder="" disabled></textarea>
						</div>
					</div>
				</div>
			</form>
		</Fragment>
	)
}