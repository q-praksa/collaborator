import Layout from '@components/Layout';
import ProjectCard from '@components/ProjectCard';
import { ProjectStatus } from '@components/ProjectCard/types';

function TestBB() {
    return (
        <Layout>
            <div>
                <ProjectCard
                    status={ProjectStatus.inactive}
                    client={'Colaborator'}
                    lead={'Kim Novak'}
                    manager={'Kim Novak'}
                    teamType={'Frontend'}
                    startDate={'01-01-2021'}
                    endDate={'N/A'}
                />
            </div>
        </Layout>
    );
}

export default TestBB;
