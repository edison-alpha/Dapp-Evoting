// SPDX-Licence-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract OnlineVoting {
    // contract owner;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    // Model of candidate;
    struct Candidate {
        uint256 candidate_id;
        string candidate_name;
        uint256 candidate_voteCount;
        string candidate_img;
        uint256 candidate_age;
        string candidate_partyName;
        string candidate_partyLogo;
    }

    // total voters array
    address[] private votersArr;

    // Store account that have voted;
    mapping(address => bool) private voters;
    // Fetch candidates using mapping key=>value
    mapping(uint256 => Candidate) private candidate;
    uint256 private candidateCount = 0;

    // events
    event votedEvent(uint256 indexed _candidateId);
    event candidateEvent(string _message);

    // WinnerId;
    uint256 private winnerId;

    // is Result declared or not
    bool private isResultDeclared;

    function addCandidate(
        string memory _name,
        uint256 _age,
        string memory _partyName,
        string memory _partyLogo,
        string memory _candidate_pic
    ) public {
        // increase candidateCount;
        Candidate storage c = candidate[candidateCount];
        c.candidate_id = candidateCount;
        c.candidate_name = _name;
        c.candidate_voteCount = 0;
        c.candidate_age = _age;
        c.candidate_partyName = _partyName;
        c.candidate_partyLogo = _partyLogo;
        c.candidate_img = _candidate_pic;
        candidateCount++;
        // Emit candidate creation event;
        emit candidateEvent("Candidate added to smart contract!");
    }

    function addVote(uint256 _candidateId) public {
        // require that they have not voted before - the voter's accound doesn't already exist in group
        require(!voters[msg.sender], "You already cast your vote!");

        // require a valid candidate
        require(
            _candidateId >= 0 && _candidateId <= candidateCount,
            "Invalid candidate!"
        );

        // record that voter is voted;
        voters[msg.sender] = true;

        // Update candidate vote count;
        candidate[_candidateId].candidate_voteCount++;

        // push voter to votersArr;
        votersArr.push(msg.sender);

        // trigger voting done event;
        emit votedEvent(_candidateId);
    }

    function findMaxVoteCandidate() public{
        require(msg.sender == owner, "You don't have the access");
        uint256 max = 0;
        for (uint256 i = 0; i < candidateCount; i++) {
            if (candidate[i].candidate_voteCount > max) {
                max = candidate[i].candidate_voteCount;
                winnerId = i;
                isResultDeclared = true;
            }
        }
    }

    function getWinner() public view returns (Candidate memory) {
        return candidate[winnerId];
    }

    function getCandidate() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidate = new Candidate[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            Candidate storage item = candidate[i];

            allCandidate[i] = item;
        }

        return allCandidate;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function getVoters() public view returns(address[] memory){
        return votersArr;
    }

    function resultStatus() public view returns (bool){
        return isResultDeclared;
    }

}
