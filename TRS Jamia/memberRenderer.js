document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("members-tree");

  fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => renderTree(data))
    .catch((error) => console.error("Error loading members:", error));

  function renderTree(data) {
    const nodes = [];
    const edges = [];

    const rootId = 0;
    nodes.push({ id: rootId, label: data.name, color: "#ffcc00" });

    data.children.forEach((team, index) => {
      const teamId = index + 1;
      nodes.push({
        id: teamId,
        label: `${team.team}\nLead: ${team.teamLead}`,
        color: "#4da6ff",
      });
      edges.push({ from: rootId, to: teamId });

      // Add each team member as a node linked to their team
      team.members.forEach((member, memberIndex) => {
        const memberId = `${teamId}-${memberIndex}`;
        nodes.push({ id: memberId, label: member, color: "#ffffff" });
        edges.push({ from: teamId, to: memberId });
      });
    });

    const dataForGraph = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges),
    };

    const options = {
      layout: {
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
          nodeSpacing: 200,
          treeSpacing: 400,
        },
      },
      physics: {
        enabled: true,
      },
    };

    // Create and render the network
    new vis.Network(container, dataForGraph, options);
  }
});
