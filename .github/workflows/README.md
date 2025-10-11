# GitHub Workflows

This directory contains GitHub Actions workflows for the Smart Agriculture System project.

## Workflows

### 1. Docker Build and Publish (`publish_to_docker.yaml`)

**Trigger**: Pull request merged into `release` branch
**Purpose**: Builds and publishes Docker images to Docker Hub

**Features**:
- Only runs when a PR is merged into the `release` branch
- Supports custom versioning via commit message (`VERSION: alpine-1.2.0`)
- Auto-increments patch version if no version specified
- Builds and pushes all service images (backend, frontend, prediction, recommendation)
- Comprehensive error handling and logging

**Version Handling**:
- If merge commit contains `VERSION: alpine-1.2.0`, uses that version
- Otherwise, fetches latest tag from Docker Hub and increments patch version
- Expected format: `prefix-major.minor.patch` (e.g., `alpine-1.2.3`)

**Required Secrets**:
- `DOCKERHUB_USERNAME`: Docker Hub username
- `DOCKERHUB_TOKEN`: Docker Hub access token

### 2. Create Release Issue (`create-release-issue.yml`)

**Trigger**: Pull request opened to `release` branch
**Purpose**: Automatically creates an issue when a release PR is opened

**Features**:
- Creates issue titled "Docker Release Pending: PR #X"
- Includes PR details and expected workflow behavior
- Adds appropriate labels (`docker`, `release`, `automated`)

## Usage

### Creating a Release

1. **Open a PR to the `release` branch**
   - An issue will be automatically created
   - The issue will track the pending Docker release

2. **Merge the PR**
   - Include version in commit message: `VERSION: alpine-1.2.0`
   - Or let the workflow auto-increment the patch version
   - Docker images will be built and pushed automatically

3. **Verify the Release**
   - Check Docker Hub: https://hub.docker.com/r/iddhi/smart-agriculture-system/tags
   - All service images will be tagged with the same version

### Version Examples

```bash
# Custom version in commit message
git commit -m "VERSION: alpine-1.2.0 - Add new feature"

# Auto-increment (if latest tag is alpine-1.2.3, becomes alpine-1.2.4)
git commit -m "Fix bug in authentication"
```

## Troubleshooting

### Common Issues

1. **Workflow doesn't trigger**
   - Ensure PR is targeting `release` branch
   - Check that PR is actually merged (not just closed)

2. **Version parsing fails**
   - Ensure version format matches: `prefix-major.minor.patch`
   - Check Docker Hub has existing tags in correct format

3. **Docker push fails**
   - Verify `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets are set
   - Check Docker Hub repository permissions

4. **Build fails**
   - Check `docker-compose.publish.yaml` configuration
   - Ensure all Dockerfiles are valid
   - Check for missing dependencies

### Debug Information

The workflows include extensive logging:
- Version detection and parsing steps
- Docker build and push progress
- Error messages with context
- Final verification steps

Check the Actions tab in GitHub for detailed logs.
