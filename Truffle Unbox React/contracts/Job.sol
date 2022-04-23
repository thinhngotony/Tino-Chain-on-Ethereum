// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Job {

    enum JobStatus {Free, Working, Applying, Quitting}

    struct ID{
        Job.JobStatus _status;
        address _id;
    }
    
    mapping (address => ID) public status;
    address owner;
     

    event LogNewAlert(address _from, string description, address _to);

    constructor() public {
        
        status[owner]._id = msg.sender; 

        status[owner]._status = JobStatus.Free;
        
        owner = msg.sender; // Thiếu cái này sẽ không thay đổi trạng thái khi search thông tin của người ta 
    }

    function Applying(address _to) public {
        require (status[msg.sender]._status == JobStatus.Free, "You are not free");
        status[owner]._status = JobStatus.Applying;
        status[owner]._id = msg.sender ;
        emit LogNewAlert(msg.sender, "Applying for ", _to);
    }


    function Working(address _to) public {
        require (status[owner]._status == JobStatus.Applying, "Please apply first");
        status[owner]._status = JobStatus.Working;
        status[owner]._id = owner;
        // status[owner]._id = msg.sender ;
        emit LogNewAlert(_to, "now working for ", msg.sender);
    }

    
    function Quitting(address _to) public {
        require (status[msg.sender]._status == JobStatus.Working, "You're not working now");
        status[owner]._status = JobStatus.Quitting;
        status[owner]._id = msg.sender ;
        emit LogNewAlert(msg.sender, "Lefting ", _to);
    }



    function Free(address _to) public {
        require (status[owner]._status == JobStatus.Quitting, "Please request quit first");
        status[owner]._status = JobStatus.Free;
        status[owner]._id = msg.sender;
        emit LogNewAlert(_to, "Lefting ", msg.sender);
    }



    function getStatus(JobStatus _JobStatus) internal pure returns (string memory){
        if(JobStatus.Free == _JobStatus) return "Free";
        if(JobStatus.Applying == _JobStatus) return "Applying";
        if(JobStatus.Working == _JobStatus) return "Working";
        if(JobStatus.Quitting == _JobStatus) return "Quitting";
        
    }


    function Status() public view returns (string memory){
        JobStatus _JobStatus = status[owner]._status;
        return getStatus(_JobStatus);
    }

}
