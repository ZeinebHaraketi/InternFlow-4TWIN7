import React ,{useState} from "react";
// reactstrap components
import {
  Card, 
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardGroup,
  CardTitle,
  ListGroup,
  ListGroupItem,Button,  Modal,ModalHeader,ModalFooter
} from "reactstrap";

// core components
import Swal from "sweetalert2";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useHistory , useLocation } from "react-router-dom";
import { BsLine } from "react-icons/bs";
import Accordion from 'components/Accordion';
import queryString from 'query-string';
import CondidatNavbar from "components/Navbars/CondidatNavbar";

const  ApplyPage=()=> {
  const [modal, setModal] = useState(false);
  const openForm = () => setModal(!modal);
  const location = useLocation();
  const idO = new URLSearchParams(location.search).get('idC');
  const id = localStorage.getItem("id");
  console.log(idO);

  const history = useHistory();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [Open, setOpen] = React.useState(1);
  const [applyData, setApplyData] = React.useState({
    status:"",
    dateApply:"",
    intern:{
      name:"",
      pfpPath:""
    }
  });
  const [resume, setResume] = React.useState({
  });
  const [company, setCompany] = React.useState({
  });
  console.log(company);
  const [idR, setIdR] = React.useState();
console.log(idR);

document.documentElement.classList.remove("nav-open");
React.useEffect(() => {
  document.body.classList.add("landing-page");
  return function cleanup() {
    document.body.classList.remove("landing-page");
  };
});
React.useEffect(() => {
  fetch(`http://localhost:5000/Candidacy/showApplyOffer/?idC=${idO}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
       const applyData =data;
       setUserData(applyData.intern);
       setApplyData(applyData);
       const checkResume = async () => {
   //     console.log(applyData)
console.log(applyData.resumeType);
const id=applyData._id;

        const response = await fetch(`http://localhost:5000/Candidacy/showResume?id=${applyData._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setResume(data);
      };

       checkResume();


       const company=async()=>{
        const response = await fetch(`http://localhost:5000/Candidacy/showCompany?idO=${idO}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
const d=await response.json();
setCompany(d);


       }
      company();    })


    
      .catch(error => console.error(error));
  
}, []);
const [userd, setUserData] = useState({
name: "",
lastName: "",
email: "",
occupation: "",
pfpPath: "",
educations: [
  {
    schoolName: "",
    degree: "",
    description: ""
  }
],
experiences: [
  {
    jobTitle: "",
    company: "",
    description: ""
  }
],
skills: [],
local: [],
description: ""
}

);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });


  if (!token) {

    history.push('/sign-in');

  }
  const goedit = async (event) => {

    //history.push('/Edit-condidat-page');

    history.push(`/Edit-condidat-page`);


}
console.log(userd);

const deleteApply = () => {
  fetch(`http://localhost:5000/Candidacy/delete?idA=${applyData._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setTimeout(() => {
        Swal.fire("Success!", "Apply added successfully!", "success");

        history.push("/profile");
      }, 2000);
      return response.json();
    })
    
    .catch(error => {
      console.error('Error while deleting Candidacy:', error);
      // Gérer l'erreur ou afficher un message d'erreur si nécessaire
    });
};
const file = () => {
  fetch(`http://localhost:5000/Candidacy/resume?fileName=${resume.filePath}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.arrayBuffer();
  })
  .then(buffer => {
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  })
  .catch(error => {
    console.error('Error while fetching file:', error);
  });



}

console.log(applyData.intern.pfpPath);
  return (
    <>
    <CondidatNavbar></CondidatNavbar>
      <ProfilePageHeader />

      <div className="section profile-content" >
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={applyData.intern.pfpPath}
              />
            </div>
          <Row >
            <Col md="4" >
              <Card className="text-center text-md-left">
                <CardHeader>
                <CardTitle  tag="h5" style={{fontWeight:"bold", fontSize: 22}}>{userd.name} {userd.lastName}</CardTitle>
                  {userd.occupation}
                </CardHeader>
                <CardBody>
                <ListGroup flush>
              <ListGroupItem className="justify-content-between txt">
              Status :
                  <h6 className="description">{applyData.status}</h6>
     
              </ListGroupItem>
            <ListGroupItem className="justify-content-between txt">
            Company's name :
                    <h6 className="description">{userd.name} </h6>
  
        </ListGroupItem>
         
        <ListGroupItem className="justify-content-between txt">
            Date of Apply :
                    <h6 className="description">{new Date(applyData.dateApply).toLocaleDateString()}</h6>
  
        </ListGroupItem>
         
</ListGroup>
                  
                
                    
                </CardBody>
              </Card >
              <Card className="text-center text-md-left">
                <CardHeader>
                <CardTitle  tag="h5" style={{fontWeight:"bold", fontSize: 17}}>The motivation letter </CardTitle>
                  {userd.occupation}
                </CardHeader>
                <CardBody>
                <ListGroup flush>
              <ListGroupItem className="justify-content-between">
                  <h6 className="description">{applyData.lettre}</h6>
     
              </ListGroupItem>
            

</ListGroup>
                  

                  

                    
                    
                </CardBody>
                
              </Card >
              <div col="4">
              <Button className="bbt3" onClick={file}>file</Button>    
              </div>     
            </Col>
            <Col md="8">
             
              <Card className="text-center text-md-left" >
              <CardHeader>About:</CardHeader>
              <CardBody style={{padding: "18p"}}>
                <h5 className="text-uppercase txt">Bio:</h5>
              <p>{resume.description}</p>
 
   
       
        {(resume.experiences && resume.experiences.length !== 0 ) && (<Accordion title={"Work experience"} >
          {resume.experiences.map((experience, index) => (
            <Row key={index} style={{padding: "18px"}}>
              <Col className="text-center text-md-left" >
                <h6 className="text-uppercase">{experience.jobTitle}</h6>
                <p style={{fontWeight: 500}}>Worked at: {experience.company} </p><p> from : {new Date(experience.startDate).toLocaleDateString()} to: {new Date(experience.endDate).toLocaleDateString()}</p>
                <p>{experience.description}</p>
              </Col>
            </Row>
            ))}
          </Accordion>
      )}
         {(resume.educations && resume.educations.length !== 0 ) && (<Accordion title={"Education"} >
          {resume.educations.map((education, index) => (
            <Row key={index} style={{padding: "18px"}}>
              <Col className="text-center text-md-left" >
                <h6 className="text-uppercase">{education.degree}</h6>
                <p style={{fontWeight: 500}}>Studied at: {education.schoolName} </p><p> from : {new Date(education.startDate).toLocaleDateString()} to: {new Date(education.endDate).toLocaleDateString()}</p>
                <p>{education.description}</p>
              </Col>
            </Row>
            ))}
          </Accordion>
      )}
 {(resume.skills && resume.skills.length !== 0 ) && (<Accordion title={"Skills"} >
          {resume.skills.map((skill, index) => (
            <Row key={index} style={{padding: "18px"}}>
              <Col className="text-center text-md-left" >
                <h6 className="text-uppercase">{skill}</h6>
              </Col>
            </Row>
            ))}
          </Accordion>
      )}

              </CardBody>
                </Card>
            
            </Col>
          </Row>




           </div>
        </Container>
      </div>
      <DemoFooter />


      <Modal isOpen={modal} toggle={openForm}>
        <ModalHeader toggle={openForm}>Delete your apply</ModalHeader>
        
        <ModalFooter>
        <Button color="primary" onClick={deleteApply}>Delete</Button>

          <Button color="secondary" >Annuler</Button>
        </ModalFooter>
      </Modal>



    </>
  );
}


export default ApplyPage;
